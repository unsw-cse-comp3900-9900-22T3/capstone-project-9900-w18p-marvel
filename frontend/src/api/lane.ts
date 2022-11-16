import { getApp } from "firebase/app";
import { getFirestore, setDoc, doc, deleteDoc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
import { uid } from "uid";
import { Lane } from "./type";

export const addLane = async (
    id:string,
    projectId: string,
    name: string,
  ) => {
    const app = getApp();
    const db = getFirestore(app);
    await setDoc(doc(db, "lanes", id), {
      name,
      projectId,
    });
  };
  
  export const deleteLane = async (id: string) => {
    const app = getApp();
    const db = getFirestore(app);
    await deleteDoc(doc(db, "lanes", id));
  };

  export const updateLane = async (
    id: string,
    name: string,
  ) => {
    const app = getApp();
    const db = getFirestore(app);
    await updateDoc(doc(db, "lanes", id), {name:name});
  };
  
  export const queryAllLanes: () => Promise<Array<Lane>> = async () => {
    const app = getApp();
    const db = getFirestore(app);
  
    const querySnapshot = await getDocs(collection(db, "lanes"));
    const data: Array<Lane> = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== "placeholder") {
        data.push({
          id: doc.id,
          ...doc.data(),
        } as Lane);
      }
    });
  
    return data;
  };
  
  export const queryLaneByProjectId: (projectId: string) => Promise<Array<Lane>> = async (
    projectId: string
  ) => {
    const app = getApp();
    const db = getFirestore(app);
    const q = query(collection(db, "lanes"), where("projectId", "==", projectId));
  
    const querySnapshot = await getDocs(q);
    const data: Array<Lane> = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      } as Lane);
    });
    return data;
  };
  
  export const deleteAllLanes = async () => {
    const app = getApp();
    const db = getFirestore(app);
    const docSnap = await queryAllLanes();
    docSnap.forEach(async (c) => {
      console.log("deleting lane:", c.id);
      deleteDoc(doc(db, "lanes", c.id));
    });
  };