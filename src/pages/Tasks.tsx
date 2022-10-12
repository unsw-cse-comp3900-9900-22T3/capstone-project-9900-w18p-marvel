import { createTask } from "../api/task";
import { Button } from "../components/Button";
import { uid } from "uid";
import { faker } from "@faker-js/faker";
import { useApp } from "../App";
import { useState } from "react";
import { Lane } from "../components/Lane";
import { Popup } from "../components/Popup";
import { TaskDetail } from "../components/TaskDetail";

interface Props {}

export const Tasks = ({}: Props) => {
  const { user } = useApp();
  const [data, setData] = useState(["Todo", "On Going"]);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full h-full flex flex-row gap-6">
        {data.map((item: any) => (
          <Lane
            name={item}
            onClick={(id) => {
              setOpen(true);
            }}
          />
        ))}
      </div>
      <Popup open={open} onClose={() => setOpen(false)}>
        <div className="w-[800px] h-[1118px]">
          <TaskDetail />
        </div>
      </Popup>
    </>
  );
};
