import { getApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore"; 
import { delay } from "../utils/promise";


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

export const searchCollaborators = async (name:string)=>{
  await delay(2000)
  return [{src:'',name:'xxx',description:'xxx',id:'001'},{src:'',name:'yyy',description:'xxx',id:'002'},{src:'',name:'xxy',description:'xxx',id:'003'}]
}

export const setCollaborators = async (collaborators:Array<string>,taskId:string)=>{
  console.log("setCollaborators",collaborators)
}

export const queryCollaborators = async ()=>{}