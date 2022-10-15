import { Avatar } from "./Avatar"
import { Button } from "./Button"

interface Props {
    src:string
    name:string
    description:string
}


export const Notification = ({src,name,description}:Props)=>{
    return (
        <div className="flex flex-row items-center w-[432px] h-24 bg-gray-50 rounded-xl justify-between">
            <div className="flex">
                <div className="ml-5">
                    <Avatar src={src} size="md" rounded="full"/>
                </div>
                <div className="flex flex-col items-start ml-4">
                    <div className="text-sm font-bold">{name}</div>
                    <div className="text-xs font-medium text-gray-100">{description}</div>
                </div>
            </div>
            <div className="flex pr-6 items-center">
                <div className="ml-4">
                    <Button
                        theme="blue"
                        size="hug"
                        rounded="2xl" 
                        label={"Confirm"}
                    ></Button>
                </div>
                <div className="ml-2">
                    <Button
                        theme="gray"
                        size="hug"
                        rounded="2xl" 
                        label={"Delete"}
                        
                    ></Button>
                </div>
            </div>
            
        </div>
    )
}