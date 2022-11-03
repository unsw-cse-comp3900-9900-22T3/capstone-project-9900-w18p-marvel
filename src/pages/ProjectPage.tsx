import { getApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { delay } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { queryMyProjects } from "../api/project";
import { Project } from "../api/type";
import { useApp } from "../App";
import { ProjectCard } from "../components/ProjectCard";

interface ProjectProps {}

export const ProjectPage = ({}: ProjectProps) => {
  const { user, projectId, setProjectId } = useApp();

  const [data, setData] = useState<Array<Project>>([]);

  const navigate = useNavigate();

  let observer: any = null;

  const refetch = async (userId: string) => {
    if (userId) {
      const data = await queryMyProjects(userId);
      setData(data);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      const app = getApp();
      const db = getFirestore(app);
      if (observer) observer();
      const q = query(
        collection(db, "projectcollaborators"),
        where("userId", "==", user.uid)
      );
      observer = onSnapshot(q, (querySnapshot) => {
        if (user?.uid) refetch(user.uid);
      });
      return () => {
        if (observer) observer();
      };
    }
    if(user?.uid) refetch(user?.uid);
  }, [user]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute left-12 top-12 text-sm text-gray-100 font-bold">
        MY PROJECT
      </div>
      <div className="w-full h-full pt-24 px-10 pb-12 overflow-scroll">
        <div className="grid grid-cols-4 gap-4 overflow-scroll">
          {data.map((item: any) => (
            <ProjectCard
              key={uid(4)}
              src={item.photoURL.downloadURL}
              title={item.title}
              id={item.id}
              createdBy={item.createdBy}
              onClick={() => {
                setProjectId?.(item.id);
                navigate("/projects/" + item.id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
