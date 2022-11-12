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
import {
  queryCollaboratorsInTask,
  queryTaskCollaboratorsByKeyword,
} from "./taskcollaborator";
import { UserListAdmin } from "../components/UserListAdmin";

export const createTask = async (
  id: string,
  title: string,
  status: Status,
  dueDate: Date,
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
    dueDate: dueDate,
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
        dueDate: doc.data().dueDate.toDate(),
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
      dueDate: docSnap.data().dueDate.toDate(),
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
  dueDate: Date | null,
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
  if (dueDate) {
    upsert.dueDate = dueDate;
  }
  if (description) {
    upsert.description = description;
  }
  if (laneId) {
    upsert.laneId = laneId;
  }
  await updateDoc(doc(db, "tasks", taskId), upsert);
};

export const queryAllTasksByProjectId = async (
  projectId: string,
  userIds: Array<string>,
  title: string,
  description: string,
  startDate:Date|null,
  endDate:Date|null
) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(collection(db, "tasks"), where("projectId", "==", projectId));

  const querySnapshot = await getDocs(q);
  const data: Array<Task> = [];
  querySnapshot.forEach(async (doc: any) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      dueDate: doc.data().dueDate.toDate(),
      createdAt: doc.data().createdAt.toDate(),
    } as Task);
  });
  let collabFilteredIds = data.map((d) => d.id);
  let titleFilteredIds = data.map((d) => d.id);
  let descriptionFilteredIds = data.map((d) => d.id);
  let dateFilteredIds = data.map((d) => d.id);
  if (userIds.length > 0) {
    collabFilteredIds = [];
    await Promise.all(
      data.map(async (d: any) => {
        const collabs = (await queryCollaboratorsInTask(d.id)).map(
          (c) => c.userId
        );
        const intersect = userIds.filter((u) => collabs.includes(u));
        if (intersect.length > 0) {
          collabFilteredIds.push(d.id);
        }
      })
    );
  }
  if (title.length > 0) {
    const fuse = new Fuse(data, { keys: ["title"] });
    const result = fuse.search(title);
    titleFilteredIds = result.map((item) => item.item.id);
  }
  if (description.length > 0) {
    const fuse = new Fuse(data, { keys: ["description"] });
    const result = fuse.search(description);
    descriptionFilteredIds = result.map((item) => item.item.id);
  }
  if (startDate && endDate) {
    dateFilteredIds = []
    data.map((d:Task)=>{
      if(d.dueDate.getTime() > startDate.getTime() && d.dueDate.getTime() < endDate.getTime()){
        dateFilteredIds.push(d.id)
      }
    })
  }
  const concat = [collabFilteredIds, titleFilteredIds, descriptionFilteredIds,dateFilteredIds];
  const intersection = concat.reduce((a, b) => a.filter((c) => b.includes(c)));
  const result = intersection.map((i) => ({ ...data.find((d) => d.id === i) }));
  return result as Array<Task>;
};

export const deleteTask = async (taskId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  await deleteDoc(doc(db, "tasks", taskId));
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
