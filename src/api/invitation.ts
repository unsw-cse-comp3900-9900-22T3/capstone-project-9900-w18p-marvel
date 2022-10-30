import { getApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Invitation } from "./type";

export const getInvitation: (uid: string) => Promise<Invitation | null> = async (
    id: string
  ) => {
    const app = getApp();
    const db = getFirestore(app);
    const docRef = doc(db, "invitations", id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: id } as Invitation;
    } else {
      return null;
    }
  };