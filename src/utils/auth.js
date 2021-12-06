import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import moment from "moment";
import { Platform, InteractionManager } from "react-native";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
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
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  async function register(data) {
    try {
      await auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          const date = moment().format("YYYY-MM-DD kk:mm:ss");
          db.collection("users").doc(userCredential.user.uid).set({
            createAt: date,
            email: data.email,
            name: data.name,
            birthdate: data.birthdate,
            gender: data.gender,
            ies: data.ies,
            memberType: data.memberType,
            lastname: data.lastname,
            uid: userCredential.user.uid,
            role: "ROLE_WHISTLEBLOWER",
            account: "Habilitada",
            photoProfile:
              "https://firebasestorage.googleapis.com/v0/b/minkana-5ca07.appspot.com/o/profile%2FDefaultPhotoProfile.jpg?alt=media&token=d2cb8276-8f2f-4fb4-b855-98e0d26646c5",
          });
        });
      return true;
    } catch (error) {
      handleUser(false);
      throw error;
    }
  }

  async function login(data) {
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

  async function changePasswordF(data) {
    try {
      await auth.currentUser.updatePassword(data.password);
      return true;
    } catch (error) {
      throw error;
    }
  }

  const sendPasswordResetEmail = async (email) => {
    await auth.sendPasswordResetEmail(email);
    return true;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuthData) => {
      if (userAuthData) {
        db.collection("users")
          .doc(userAuthData.uid)
          .onSnapshot((doc) => {
            const dat1 = doc.data();
            handleUser(dat1);
          });
      } else {
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
    changePasswordF,
  };
}
