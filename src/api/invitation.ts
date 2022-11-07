import { getApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Invitation } from "./type";

export const getInvitation: (id: string) => Promise<Invitation | null> = async (
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

export const queryInvitation = async (
  invitorId: string,
  inviteeId: string,
  projectId: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(
    collection(db, "invitations"),
    where("projectId", "==", projectId),
    where("createdBy", "==", invitorId),
    where("inviteeId", "==", inviteeId)
  );

  const querySnapshot = await getDocs(q);
  const data: Array<Invitation> = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    } as Invitation);
  });
  return data;
};

export const deleteInvitation = async (id: string) => {
  const app = getApp();
  const db = getFirestore(app);
  await deleteDoc(doc(db, "invitations", id));
};
