import { getApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ProjectCollaborator, Role } from "./type";

export const queryProjectCollaboratorsByProjectId: (
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

export const queryAllProjectCollaborators: () => Promise<Array<ProjectCollaborator>> = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "projectcollaborators"));
  const data: Array<ProjectCollaborator> = [];
  querySnapshot.forEach((doc) => {
    if(doc.id !== "placeholder"){
      data.push({
        id: doc.id,
        ...doc.data(),
      } as ProjectCollaborator);
    }
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

export const removeAllProjectCollaborator: () => void = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const coll = await queryAllProjectCollaborators();

  coll.forEach(async (c) => {
    deleteDoc(doc(db, "projectcollaborators", c.id));
  });
};
