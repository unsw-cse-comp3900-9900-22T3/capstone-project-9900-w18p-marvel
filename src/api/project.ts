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
import { Project, ProjectCollaborator, Resource, Task } from "./type";

export const createProject = async (
  title: string,
  photoURL: Resource,
  createdBy: string,
  createdAt: Date
) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "projects", uid(20)), {
    title: title,
    photoURL: photoURL,
    createdBy: createdBy,
    createdAt: createdAt,
  });
};

export const queryAllProjects: () => Promise<Array<Project>> = async () => {
  const app = getApp();
  const db = getFirestore(app);

  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects: Array<Project> = [];
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data(),createdAt:doc.data().createdAt.toDate() } as Project);
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
    projects.push({ id: doc.id, ...doc.data(),createdAt:doc.data().createdAt.toDate() } as Project);
  });

  const myProjects: Array<Project> = [];
  projects.forEach(async (p: Project) => {
    if (p.createdBy === userId) {
      myProjects.push(p);
    } else {
      const projectcollaborators = await queryAllCollaboratorsInProject(p.id);
      if (
        projectcollaborators.find(
          (c: ProjectCollaborator) => c.userId === userId
        )
      ) {
        myProjects.push(p);
      }
    }
  });
  return myProjects;
};

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
    if (p.id !== "00000000") {
      await deleteDoc(doc(db, "projects", p.id));
    }
  });
};
