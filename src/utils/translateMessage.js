import React from "react";

const translateMessage = (message) => {
  const messages = {
    "auth/user-not-found": "No existe una cuenta con el correo electrónico.",
    "auth/invalid-email": "La dirección de correo electrónico no es válida",
    "auth/wrong-password":
      "La dirección de correo electrónico o contraseña es incorrecta",
    "auth/too-many-requests":
      "Demasiadas solicitudes de ingreso, espere un momento y vuelva a intentarlo",
    "auth/user-disabled":
      "Su cuenta ha sido deshabilitada, comuníquese con el administrador de la aplicación (gaby.2ax.88@gmail.com)",
    "auth/email-already-in-use":
      "Ya existe una cuenta con el correo electrónico",
    "auth/network-request-failed": "Compruebe su conexión a internet",
  };

  return messages[message] || message;
};
export default translateMessage;
