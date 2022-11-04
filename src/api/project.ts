import { getApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { uid } from "uid";
import { deleteAttachment, queryAttachment } from "./attachment";
import { deleteComment, queryComment } from "./comment";
import { deleteLane, queryLaneByProjectId } from "./lane";
import { queryProjectCollaboratorsByProjectId, removeProjectCollaborator } from "./projectCollaborator";
import { deleteTask, queryAllTasksByProjectId } from "./task";
import { queryCollaboratorsInTask, queryTaskCollaboratorsByKeyword, removeTaskCollaborator } from "./taskcollaborator";
import { Lane, Project, ProjectCollaborator, Resource, Task, TaskCollaborator } from "./type";

export const createProject = async (
  id:string,
  title: string,
  photoURL: Resource,
  createdBy: string,
  createdAt: Date
) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "projects", id), {
    title: title,
    photoURL: photoURL,
    createdBy: createdBy,
    createdAt: createdAt,
  });
};

export const getProject: (id: string) => Promise<Project | null> = async (
  id: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  const docRef = doc(db, "projects", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: id } as Project;
  } else {
    return null;
  }
};

export const queryAllProjects: () => Promise<Array<Project>> = async () => {
  const app = getApp();
  const db = getFirestore(app);

  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects: Array<Project> = [];
  querySnapshot.forEach((doc) => {
    if (doc.id !== "placeholder") {
      projects.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      } as Project);
    }
  });

  return projects;
};

export const queryMyProjects: (
  userId: string
) => Promise<Array<Project>> = async (userId: string) => {
  const app = getApp();
  const db = getFirestore(app);

  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects: Array<Project> = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    projects.push({
      id: doc.id,
      ...data,
      createdAt: data.createdAt,
    } as Project);
  });

  const myProjects: Array<Project> = [];
  await Promise.all(projects.map(async (p: Project) => {
    if (p.createdBy === userId) {
      myProjects.push(p);
    } else {
      const projectcollaborators = await queryProjectCollaboratorsByProjectId(p.id);
      if (
        projectcollaborators.find(
          (c: ProjectCollaborator) => c.userId === userId
        )
      ) {
        myProjects.push(p);
      }
    }
  }));
  return myProjects;
};

export const deleteProjectAndTasks = async (projectId:string)=>{
  const app = getApp();
  const db = getFirestore(app);
  await deleteDoc(doc(db, "projects", projectId));
  const collabs = await queryProjectCollaboratorsByProjectId(projectId)
  collabs.forEach((c)=>{
    removeProjectCollaborator(c.userId,c.projectId)
  })
  const tasks = await queryAllTasksByProjectId(projectId,[],"","",null,null)
  tasks.forEach(async (t:Task)=>{
    const tCollabs = await queryCollaboratorsInTask(t.id)
    tCollabs.forEach((tc:TaskCollaborator)=>{
      removeTaskCollaborator(tc.userId,tc.taskId)
    })
    const comments = await queryComment(t.id)
    comments.forEach(cm=>deleteComment(cm.id))
    const attachments = await queryAttachment(t.id)
    attachments.forEach(at=>deleteAttachment(at.id,(err)=>{},(path)=>{}))
    deleteTask(t.id)
  })
  const lanes = await queryLaneByProjectId(projectId)
  lanes.forEach((l:Lane)=>{
    deleteLane(l.id)
  })
}

export const deleteProject = async (projectId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  await deleteDoc(doc(db, "projects", projectId));
};

export const deleteAllProject = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const projects = await queryAllProjects();
  projects.forEach(async (p) => {
    await deleteDoc(doc(db, "projects", p.id));
  });
};
