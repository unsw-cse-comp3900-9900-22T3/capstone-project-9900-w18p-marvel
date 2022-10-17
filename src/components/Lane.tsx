import { faker } from "@faker-js/faker"
import { useState } from "react"
import { uid } from "uid"
import { Task } from "../api/type"
import { TaskCard } from "./TaskCard"

interface Props {
    name:string
    onClick?:(id:string)=>void
}

export const Lane = ({name,onClick}:Props)=>{
    const [data, setData] = useState<Array<Task>>([
      {
        id: "",
        createdAt: faker.date.recent(),
        createdBy: "",
        description: "string",
        dueDate: faker.date.future(),
        projectId: "string",
        laneName: "string",
        status: "start",
        title: "string",
        cover: { downloadURL: "", storagePath: "" },
      },
      {
        id: "",
        createdAt: faker.date.recent(),
        createdBy: "",
        description: "string",
        dueDate: faker.date.future(),
        projectId: "string",
        laneName: "string",
        status: "start",
        title: "string",
        cover: { downloadURL: faker.image.cats(), storagePath: "" },
      },
      {
        id: "",
        createdAt: faker.date.recent(),
        createdBy: "",
        description: "string",
        dueDate: faker.date.future(),
        projectId: "string",
        laneName: "string",
        status: "start",
        title: "string",
        cover: { downloadURL: faker.image.city(), storagePath: "" },
      },
      {
        id: "",
        createdAt: faker.date.recent(),
        createdBy: "",
        description: "string",
        dueDate: faker.date.future(),
        projectId: "string",
        laneName: "string",
        status: "start",
        title: "string",
        cover: { downloadURL: faker.image.business(), storagePath: "" },
      },
      {
        id: "",
        createdAt: faker.date.recent(),
        createdBy: "",
        description: "string",
        dueDate: faker.date.future(),
        projectId: "string",
        laneName: "string",
        status: "start",
        title: "string",
        cover: { downloadURL: "", storagePath: "" },
      },
    ]);
    return (
      <div className="relative w-96 h-full">
        <div className="absolute left-6 top-6 text-base text-gray-100 font-bold">
          {name}
        </div>
        <div className="w-full pt-20 px-6 pb-6 h-full ">
          <div className="w-full h-full overflow-scroll flex flex-col gap-4">
            {data.map((item: any) => (
              <TaskCard key={uid(4)}
                title={item.title}
                description={item.description}
                dueDate={item.dueDate}
                id={""}
                status={item.status}
                onClick={onClick}
                collaborators={[]}
                image={item.cover.downloadURL}
              />
            ))}
          </div>
        </div>
      </div>
    );
}