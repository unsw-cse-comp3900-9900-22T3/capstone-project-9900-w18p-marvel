import { getApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { queryMyProjects } from "./project";
import { Project } from "./type";

let projectsObserver: Function | null = null;

export const startProjectsObserver = (
  userId: string,
  onChange: (projetcs: Array<Project>) => void
) => {
  const app = getApp();
  const db = getFirestore(app);
  if (projectsObserver) projectsObserver();
  const q = query(collection(db, "project"));
  projectsObserver = onSnapshot(q, async (querySnapshot) => {
    const projects = await queryMyProjects(userId);
    onChange?.(projects);
  });
};
