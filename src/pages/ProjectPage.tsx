import { delay } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { queryMyProjects } from "../api/project";
import { Project } from "../api/type";
import { useApp } from "../App";
import { ProjectCard } from "../components/ProjectCard";

interface ProjectProps {}

const data = [
  {
    image: "/Image.png",
    name: "Learning Maxon Cinema 4D - A Beginners Training Course",
    time: new Date(),
  },
  {
    image: "/Image-1.png",
    name: "Introduction to Community Management",
    time: new Date(),
  },
  {
    image: "/Image-2.png",
    name: "Content Creation and Editing for Instagram Stories",
    time: new Date(),
  },
  {
    image: "/Image-3.png",
    name: "Architectural Sketching with Watercolor and Ink",
    time: new Date(),
  },
  {
    image: "/Image-4.png",
    name: "Digital Fantasy Portraits with Photoshop",
    time: new Date(),
  },
  {
    image: "/Image-5.png",
    name: "Adobe Photoshop for Photo Editing and Retouching",
    time: new Date(),
  },
  {
    image: "/Image-6.png",
    name: "Design of Graphic Elements to Boost Your Brand",
    time: new Date(),
  },
];

export const ProjectPage = ({}: ProjectProps) => {
  const { user, projectId, setProjectId } = useApp();

  const [data, setData] = useState<Array<Project>>([]);

  const navigate = useNavigate();

  const refetch = async () => {
    if (user?.uid) {
      const data = await queryMyProjects(user.uid);
      setData(data);
    }
  };

  useEffect(() => {
    refetch();
  }, [user]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute left-12 top-12 text-sm text-gray-100 font-bold">
        MY PROJECT
      </div>
      <div className="w-full h-full pt-24 px-10 pb-12">
        <div className="grid grid-cols-4 gap-4">
          {data.map((item: any) => (
            <ProjectCard
              key={uid(4)}
              src={item.photoURL.downloadURL}
              title={item.title}
              id={item.id}
              createdBy={item.createdBy}
              onClick={() => {
                setProjectId?.(item.id);
                navigate("/projects/"+item.id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
