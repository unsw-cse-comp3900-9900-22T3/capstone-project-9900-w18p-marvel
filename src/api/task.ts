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
  id:string,
  title: string,
  status: Status,
  dueData: Date,
  description: string,
  createdBy: string,
  createdAt: Date,
  projectId: string,
  laneName: string,
  cover: File | null
) => {
  const app = getApp();
  const db = getFirestore(app);
  if (cover) {
    uploadFile(
      cover,
      "image",
      (prog) => {},
      (err) => {},
      async (downloadURL, storagePath) => {
        await setDoc(doc(db, "tasks", id), {
          title: title,
          status: status,
          projectId: projectId,
          laneName: laneName,
          dueData: dueData,
          description: description,
          createdBy: createdBy,
          createdAt: createdAt,
          cover: { downloadURL, storagePath },
        });
      }
    );
  } else {
    await setDoc(doc(db, "tasks", id), {
      title: title,
      status: status,
      projectId: projectId,
      laneName: laneName,
      dueData: dueData,
      description: description,
      createdBy: createdBy,
      createdAt: createdAt,
      cover: { downloadURL: "", storagePath: "" },
    });
  }
  console.log("creating task:", id);
};

export const queryAllTasks: () => Promise<Array<Task>> = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const data: Array<Task> = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Task);
  });

  return data;
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
    data.push({ id: doc.id, ...doc.data() } as Task);
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
    data.push({ id: doc.id, ...doc.data() } as Task);
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
    if (t.id !== "00000000") {
      deleteTask(t.id);
      console.log("deleting task:", t.id);
    }
  });
};
