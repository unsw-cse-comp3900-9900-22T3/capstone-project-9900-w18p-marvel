import { getApp } from "firebase/app";
import { collection, doc, getFirestore, query, setDoc, where } from "firebase/firestore";
import { uid } from "uid";

export const createProject = async (
    title: string,
    img: string,
    createdBy: string,
    createdAt: Date
  ) => {
    const app = getApp();
    const db = getFirestore(app);
    await setDoc(doc(db, "projects", uid(20)), {
      title: title,
      img: img,
      createdBy: createdBy,
      createdAt: createdAt,
    });
  };

  export const queryProjects: () => Promise<Array<Project>> = async () => {
    const app = getApp();
    const db = getFirestore(app);
    const q = query(collection(db, "projects"), where("status", "==", "start"));
  
    const querySnapshot = await getDocs(q);
    const data: Array<Task> = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data } as Task);
    });
    return data;
  };