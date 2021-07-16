import { db } from "../utils/firebase";

export default User = {
  updatePlan: (id, data) => {
    return db.collection("users").doc(id).update({
      name: data.name,
      lastname: data.lastname,
    });
  },
};
