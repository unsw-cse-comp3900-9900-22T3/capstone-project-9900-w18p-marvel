import { CreateProject } from "../components/CreateProject"

interface ProjectProps {}

const data=[
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()}
]


export const Project = ({}: ProjectProps) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-12 top-12 text-sm text-gray-100 font-bold">
        MY PROJECT
      </div>
      <div className="w-full h-full pt-24 px-12 pb-12">
        <div className="grid grid-cols-4 gap-4">
          {data.map((item: any) => (
            <CreateProject src={item.image} name={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
};
