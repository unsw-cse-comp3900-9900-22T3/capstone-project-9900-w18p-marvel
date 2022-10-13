import { getApp } from "firebase/app";
import {
  collection,
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
import Fuse from 'fuse.js'
import { getStorage, ref } from "firebase/storage";

export type Status = "start" | "blocked" | "complete";

export const createProject = async (
  title: string,
  img: string,
  createdBy: string,
  createdAt: Date
) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "project", uid(20)), {
    title: title,
    img: img,
    createdBy: createdBy,
    createdAt: createdAt,
  });
};

export const createTask = async (
  title: string,
  status: Status,
  dueData: Date,
  description: string,
  createdBy: string,
  createdAt: Date,
  projectId: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "task", uid(20)), {
    title: title,
    status: status,
    projectId: projectId,
    dueData: dueData,
    description: description,
    createdBy: createdBy,
    createdAt: createdAt,
  });
};

export const queryTasks = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(collection(db, "task"), where("status", "==", "start"));

  const querySnapshot = await getDocs(q);
  const data:any = []
  querySnapshot.forEach((doc) => {
    data.push({id:doc.id,...doc.data})
  });
  return data
};

export const requestConnection = async (
  inviteeId: string,
  createdBy: string,
  createdAt: Date
) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "invitation", uid(20)), {
    createdBy: createdBy,
    createdAt: createdAt,
    inviteeId: inviteeId,
  });
};

export const answerConnection = async (
  invitationId: string,
  accept: boolean,
  createdBy: string,
  createdAt: Date
) => {
  const app = getApp();
  const db = getFirestore(app);

  if (accept) {
    const docRef = doc(db, "connection", invitationId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(doc(db, "connection", uid(20)), {
        createdBy: docSnap.data().createdBy,
        createdAt: createdAt,
        approvedBy: createdBy,
      });
    } else {
    }
  } else {
  }
};

export const createUser = async (userId:string,email:string,name:string)=>{
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "user", userId), {
    email: email,
    name: name,
    photoUrl: "",
    verified:false
  });
}

export const uploadFile = async (email:string,username:string,file:any)=>{
  if(file){
    const storage = getStorage()
    const name = uid(20)
    const imgRef = ref(storage,name)
    const pathRef = ref(storage,"images/"+name)
  }
  return
}

export const queryUsers = async (keyword: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "user"));
  const data:any = []
  querySnapshot.forEach((doc) => {
    data.push({id:doc.id,...doc.data})
  });
  const fuse = new Fuse(data,{keys:['name','email']})
  const result = fuse.search(keyword)
  return result.map(item=>item.item)
};

export const searchCollaborators = async (name: string) => {
  await delay(250);
  return [
    { src: "", name: "xxx", description: "xxx", id: "001" },
    { src: "", name: "yyy", description: "xxx", id: "002" },
    { src: "", name: "xxy", description: "xxx", id: "003" },
  ];
};

export const setCollaborators = async (
  collaborators: Array<string>,
  taskId: string
) => {
  console.log("setCollaborators", collaborators);
};

export const queryCollaborators = async () => {};
