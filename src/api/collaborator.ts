import { getApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import Fuse from "fuse.js";
import { queryTasksByProjectId } from "./task";
import { TaskCollaborator, Role, Task, User, ProjectCollaborator } from "./type";

export const updateCollaborators = async (
  uids: Array<string>,
  taskId: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  const collaborators = await queryCollaboratorsInTask(taskId)
  collaborators.forEach(async (c:TaskCollaborator)=>{
    await removeCollaborator(c.userId,taskId)
  })
  uids.forEach(async (id:string)=>{
    await addCollaborator(id,taskId)
  })
};

export const queryActiveCollaboratorsInProject = async (projectId: string) => {
  const tasks = await queryTasksByProjectId(projectId);
  let data: Array<TaskCollaborator> = [];
  tasks.forEach(async (t: Task) => {
    const collaborators = await queryCollaboratorsInTask(t.id);
    data = data.concat(collaborators);
  });
  return data;
};

export const queryAllCollaboratorsInProject: (
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

export const queryCollaboratorsInTask: (
  taskId: string
) => Promise<Array<TaskCollaborator>> = async (taskId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(
    collection(db, "taskcollaborators"),
    where("taskId", "==", taskId)
  );

  const querySnapshot = await getDocs(q);
  const data: Array<TaskCollaborator> = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data } as TaskCollaborator);
  });
  return data;
};

export const queryAllCollaborators: (
  keyword: string
) => Promise<Array<TaskCollaborator>> = async (keyword: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const userSnapshot = await getDocs(collection(db, "users"));
  const users: Array<User> = [];
  userSnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data } as User);
  });
  const fuse = new Fuse(users, { keys: ["name", "email"] });
  const result = fuse.search(keyword);
  const ids = result.map((item) => item.item.id);

  const q = query(collection(db, "taskcollaborators"), where("userId", "in", ids));

  const querySnapshot = await getDocs(q);
  const data: Array<TaskCollaborator> = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data } as TaskCollaborator);
  });
  return data;
};

export const addCollaborator:(userId:string,taskId:string)=>void = async (userId:string,taskId:string)=>{
  const app = getApp();
  const db = getFirestore(app);
  await addDoc(collection(db, "taskcollaborators"), {taskId,userId} as TaskCollaborator);
}

export const removeCollaborator:(userId:string,taskId:string)=>void = async (userId:string,taskId:string)=>{
  const app = getApp();
  const db = getFirestore(app);
  const q = query(
    collection(db, "taskcollaborators"),
    where("taskId", "==", taskId),
    where("userId", "==", userId),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (snapshot)=>{
    const id = snapshot.id
    await deleteDoc(doc(db,"taskcollaborators",id))
  })
}
