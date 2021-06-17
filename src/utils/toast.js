import React, { useContext, createContext, useState, useCallback } from "react";
import { Toast } from "react-native-ui-lib";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const defaultValues = {
    position: "top",
    backgroundColor: "#CC0000",
    message: "Context Toast",
    autoDismiss: 3000,
  };
  const [toast, setToast] = useState(defaultValues);
  const [showToast, setShowToast] = useState(false);

  const addToast = useCallback(
    function (newToast) {
      console.log("new Toast", newToast);
      setToast((prevToast) => ({ ...prevToast, ...newToast }));
      setShowToast(true);
    },
    [setToast]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Toast
        visible={showToast}
        position={toast.position}
        backgroundColor={toast.backgroundColor}
        centerMessage
        message={toast.message}
        onDismiss={() => setShowToast(false)}
        autoDismiss={toast.autoDismiss}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
