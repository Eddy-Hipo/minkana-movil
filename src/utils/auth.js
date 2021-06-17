import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import moment from "moment";
import { Platform, InteractionManager } from "react-native";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = "_lt_" + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = (id) => {
    if (typeof id === "string" && id.startsWith("_lt_")) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

export const AuthContext = createContext(() => {});

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    if (user) {
      // si tengo sesión activa
      setUser(user);

      return user;
    } else {
      // no tengo sesión activa
      setUser(false);
      return false;
    }
  };

  async function register(data) {
    try {
      await auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          const date = moment().format("MMMM Do YYYY, h:mm:ss a");
          db.collection("users").doc(userCredential.user.uid).set({
            createAt: date,
            email: data.email,
            name: data.name,
            uid: userCredential.user.uid,
          });
        });
      return true;
    } catch (error) {
      handleUser(false);
      throw error;
    }
  }

  async function login(data) {
    console.log("email", data.email);
    console.log("password", data.password);
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
      return true;
    } catch (error) {
      handleUser(false);
      throw error;
    }
  }

  async function logout() {
    try {
      await auth.signOut();
      handleUser(false);
    } catch (error) {
      throw error;
    }
  }

  const sendPasswordResetEmail = async (email) => {
    await auth.sendPasswordResetEmail(email);
    return true;
  };
  //
  // const confirmPasswordReset = (password, code) => {
  //   const resetCode = code || getFromQueryString('oobCode');
  //
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(resetCode, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuthData) => {
      if (userAuthData) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("SESIÓN ACTIVA", userAuthData);
        const userDoc = await db
          .collection("users")
          .doc(userAuthData.uid)
          .get();
        const userData = userDoc.data();
        console.log("userDAta", userData);
        handleUser(userData);
      } else {
        // User is signed out
        console.log("SIN SESIÓN", userAuthData);
        handleUser(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    register,
    login,
    logout,
    sendPasswordResetEmail,
    // confirmPasswordReset
  };
}
