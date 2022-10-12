import { useNavigate } from "react-router-dom"
import { Button } from "./Button"

interface Props{
    src:string
    name:string
}

export const CreateProject = ({src,name}:Props)=>{
    const navigate = useNavigate()
    const create = (name:string,id:string)=>{
        console.log('传的数据',name, id)
    }
    return (
      <div
        onClick={() => {
          navigate("/tasks")
        }}
        className="transition-all hover:scale-95 flex flex-col justify-start w-64 h-80 items-center gap-6 p-4 bg-white-100 rounded-2xl"
      >
        <img src={src} className="w-full h-40"/>
        <div className="w-full flex flex-row justify-start bg-white-100">
          <div className="text-base font-bold">{name}</div>
        </div>
      </div>
    );
}