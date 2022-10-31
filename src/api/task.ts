import { getApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { uid } from "uid";
import { delay } from "../utils/promise";
import Fuse from "fuse.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { Status, Task } from "./type";
import { uploadFile } from "./storage";

export const createTask = async (
  id: string,
  title: string,
  status: Status,
  dueData: Date,
  description: string,
  createdBy: string,
  createdAt: Date,
  projectId: string,
  laneId: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "tasks", id), {
    title: title,
    status: status,
    projectId: projectId,
    laneId: laneId,
    dueData: dueData,
    description: description,
    createdBy: createdBy,
    createdAt: createdAt,
    cover: { downloadURL: "", storagePath: "" },
  });
  console.log("creating task:", id);
};

export const queryAllTasks: () => Promise<Array<Task>> = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const data: Array<Task> = [];
  querySnapshot.forEach((doc) => {
    if (doc.id !== "placeholder") {
      data.push({
        id: doc.id,
        ...doc.data(),
        dueDate: doc.data().dueData.toDate(),
        createdAt: doc.data().createdAt.toDate(),
      } as Task);
    }
  });

  return data;
};

export const getTask: (id: string) => Promise<Task | null> = async (
  id: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  const docRef = doc(db, "tasks", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      id: id,
      dueDate: docSnap.data().dueData.toDate(),
      createdAt: docSnap.data().createdAt.toDate(),
    } as Task;
  } else {
    return null;
  }
};

export const updateTask = async (
  taskId: string,
  title: string | null,
  status: Status | null,
  dueData: Date | null,
  description: string | null,
  laneId: string | null
) => {
  const app = getApp();
  const db = getFirestore(app);
  let upsert: any = {};
  if (title) {
    upsert.title = title;
  }
  if (status) {
    upsert.status = status;
  }
  if (dueData) {
    upsert.dueData = dueData;
  }
  if (description) {
    upsert.description = description;
  }
  if (laneId) {
    upsert.laneId = laneId;
  }
  await updateDoc(doc(db, "tasks", taskId), upsert);
};

export const queryAllTasksByProjectId: (
  projectId: string
) => Promise<Array<Task>> = async (projectId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(collection(db, "tasks"), where("projectId", "==", projectId));

  const querySnapshot = await getDocs(q);
  const data: Array<Task> = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      dueDate: doc.data().dueData.toDate(),
      createdAt: doc.data().createdAt.toDate(),
    } as Task);
  });
  return data;
};

export const deleteTask = async (taskId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  await deleteDoc(doc(db, "tasks", taskId));
};

export const deleteLane: (laneName: string, projectId: string) => void = async (
  laneName: string,
  projectId: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(
    collection(db, "tasks"),
    where("laneName", "==", laneName),
    where("projectId", "==", projectId)
  );
  const querySnapshot = await getDocs(q);
  const data: Array<Task> = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      dueDate: doc.data().dueData.toDate(),
      createdAt: doc.data().createdAt.toDate(),
    } as Task);
  });
  data.forEach(async (item) => {
    await deleteDoc(doc(db, "tasks", item.id));
  });
};

export const deleteAllTask = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const tasks = await queryAllTasks();
  tasks.forEach((t) => {
    deleteTask(t.id);
    console.log("deleting task:", t.id);
  });
};
