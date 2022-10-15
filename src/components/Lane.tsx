import { faker } from "@faker-js/faker"
import { useState } from "react"
import { TaskCard } from "./TaskCard"
// import { LaneData } from "./../assets/LaneData"


interface Props {
    name:string
    onClick?:(id:string)=>void
}

export const Lane = ({name,onClick}:Props)=>{
    const [data, setData] = useState([
      {
        title: faker.lorem.sentence(),
        description: "",
        dueDate: faker.date.recent(),
      },
      {
        title: faker.lorem.sentence(),
        description: "",
        dueDate: faker.date.recent(),
      },
      {
        title: faker.lorem.sentence(),
        description: "",
        dueDate: faker.date.recent(),
      },
      {
        title: faker.lorem.sentence(),
        description: "",
        dueDate: faker.date.recent(),
      },
      {
        title: faker.lorem.sentence(),
        description: "",
        dueDate: faker.date.recent(),
      },
    ]);
    return (
      

    
      <div className="relative w-96 h-full">
        <div className="absolute left-6 top-6 text-base text-gray-100 font-bold">
          {name}
        </div>
        <div className="w-full h-fit pt-20 px-6 pb-6 h-full ">
          <div className="w-full h-full overflow-scroll flex flex-col gap-4">
            {data.map((item: any) => (
              <TaskCard
                title={item.title}
                description={item.description}
                dueDate={item.dueDate}
                id={""}
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      </div>
     
    );
}