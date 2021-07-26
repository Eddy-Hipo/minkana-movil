import { storage, db } from "../utils/firebase";
import { fileToBlob } from "../utils/helpers";

export const dataTotalReports = (id) => {
  return db.collection("reports").where("whistleblower", "==", id);
};

export const uploadImage = async (image, path, name) => {
  const result = { statusResponse: false, error: null, url: null };
  const ref = storage.ref(path).child(name);
  const blob = await fileToBlob(image);

  try {
    await ref.put(blob);
    const url = await storage.ref(`${path}/${name}`).getDownloadURL();
    result.statusResponse = true;
    result.url = url;
  } catch (error) {
    result.error = error;
  }
  return result;
};
