import { getApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { ProjectCollaborator, Role } from "./type";

export const queryAllProjectCollaborators: (
  projectId: string
) => Promise<Array<ProjectCollaborator>> = async (projectId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(
    collection(db, "projectcollaborators"),
    where("projectId", "==", projectId)
  );

  const querySnapshot = await getDocs(q);
  const data: Array<ProjectCollaborator> = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data } as ProjectCollaborator);
  });
  return data;
};

export const addProjectCollaborator: (
  userId: string,
  projectId: string,
  role: Role
) => void = async (userId: string, projectId: string, role: Role) => {
  const app = getApp();
  const db = getFirestore(app);
  await addDoc(collection(db, "projectcollaborators"), {
    projectId,
    userId,
    role,
  } as ProjectCollaborator);
};
