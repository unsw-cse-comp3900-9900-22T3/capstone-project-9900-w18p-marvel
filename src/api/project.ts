import { getApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { uid } from "uid";
import { queryAllCollaboratorsInProject } from "./collaborator";
import { Project, ProjectCollaborator, Task } from "./type";

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

export const queryMyProjects: (
  userId: string
) => Promise<Array<Project>> = async (userId: string) => {
  const app = getApp();
  const db = getFirestore(app);

  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects: Array<Project> = [];
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() } as Project);
  });

  const myProjects: Array<Project> = [];
  projects.forEach(async (p: Project) => {
    const projectcollaborators = await queryAllCollaboratorsInProject(p.id);
    if (
      projectcollaborators.find((c: ProjectCollaborator) => c.userId === userId)
    ) {
      myProjects.push(p);
    }
  });
  return myProjects;
};

export const deleteProject = async (projectId:string)=>{
  const app = getApp();
  const db = getFirestore(app);
  await deleteDoc(doc(db,"projects",projectId))
}