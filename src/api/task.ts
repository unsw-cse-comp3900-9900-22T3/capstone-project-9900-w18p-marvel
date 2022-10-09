import { getApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore"; 

export type Status =
| 'start'
| 'complete'

export const createTask = async (
  title: string,
  status: Status,
  id: string,
  dueData: Date,
  description: string,
  createdBy: string,
  createdAt: Date
) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "task", id), {
    title: title,
    status: status,
    projectId: id,
    dueData:dueData,
    description:description,
    createdBy:createdBy,
    createdAt:createdAt,
  });
};

const createProject = ()=>{

}