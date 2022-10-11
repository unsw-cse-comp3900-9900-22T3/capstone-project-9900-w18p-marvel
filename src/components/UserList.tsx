import { UserListItem } from "./UserListItem"
import { Button } from "./Button"
import { Input } from "./Input";
import { searchCollaborators, setCollaborators } from "../api/task";
import { useState } from "react";
import _, {  } from "lodash";
import { delay } from "../utils/promise";

interface Props{
    taskId:string
    onConfirm:(collaborators:Array<string>)=>void
}

export const UserList = ({taskId,onConfirm}:Props)=>{

    const [data,setData] = useState<any>([])
    const [selected,setSelected] = useState<Array<string>>([])


    return (
        <div className="flex flex-col gap-0 w-72">
            <div className="h-20 w-full py-3 px-3">
                <Input type={"text"} onChange={async (val:string)=>{
                    const x = await searchCollaborators(val)
                    setData(x)
                }}/>
            </div>
            <div className="h-0 w-full border-t border-gray-100"></div>
            <div className="w-full flex flex-col pt-6 pb-7 pl-7 pr-9 gap-6">
                {data.map((item:any) => (
                <UserListItem
                    src={item.src}
                    name={item.name}
                    description={item.description}
                    onValueChange={(val:boolean)=>{
                        if(val){
                            const _copy = _.cloneDeep(selected)
                            _copy.push(item.id)
                            setSelected(_copy)
                        }else{
                            const index = selected.findIndex(item.id)
                            const _copy = _.cloneDeep(selected)
                            _copy.splice(index,1)
                            setSelected(_copy)
                        }
                    }}
                ></UserListItem>
                ))}
            </div>
            <div className="h-0 w-full border-t border-gray-100"></div>
            <div className="h-20 w-full pt-4 pb-5 pl-7 pr-8">
                <Button
                    theme="blue"
                    size="fill"
                    rounded="2xl" 
                    label={"Confirm"}
                    onClick={async ()=>{
                        await setCollaborators(selected,taskId)
                        await delay(500)
                        onConfirm(selected)
                    }}
                ></Button>
            </div>
      </div>
    );
}