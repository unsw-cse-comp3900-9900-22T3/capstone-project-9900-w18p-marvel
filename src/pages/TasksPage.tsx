import { createTask } from "../api/task";
import { Button } from "../components/Button";
import { uid } from "uid";
import { faker } from "@faker-js/faker";
import { useApp } from "../App";
import { useState } from "react";
import { Lane } from "../components/Lane";
import { Popup } from "../components/Popup";
import { TaskDetail } from "../components/TaskDetail";
import { DND } from "../components/DND";
import { useParams } from "react-router-dom";
import { ProjectUserList } from "../components/ProjectUserList";

interface Props {}

export const TasksPage = ({}: Props) => {
  let { id } = useParams();
  const { user } = useApp();
  const [data, setData] = useState(["Todo", "On Going"]);
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div className="w-full h-full bg-white-100 overflow-hidden border-4 border-yellow-200">
        <DND id={id}/>
      </div>
      <Popup open={open} onClose={() => setOpen(false)}>
        <TaskDetail />
      </Popup>
      
    </>
  );
};
