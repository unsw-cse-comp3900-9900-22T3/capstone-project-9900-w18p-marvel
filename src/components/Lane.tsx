import { faker } from "@faker-js/faker"
import { useState } from "react"
import { TaskCard } from "./TaskCard"

interface Props {
    name:string
}

export const Lane = ({name}:Props)=>{
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
              />
            ))}
          </div>
        </div>
      </div>
    );
}