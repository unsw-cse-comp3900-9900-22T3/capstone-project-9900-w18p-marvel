import { Avatar } from "./Avatar"
import { Checkbox } from "./Checkbox"

interface Props {
    src:string
    name:string
    description:string
    onValueChange?:(val:boolean)=>void
    defaultSelected:boolean
}

export const UserListItem = ({src,name,description,onValueChange,defaultSelected}:Props)=>{
    return (
        <div className="flex flex-row items-center w-fill h-11 justify-between">
            <div className="flex items-center">
                <Avatar src={src} size="md" rounded="full"/>
                <div className="flex flex-col items-start ml-5">
                    <div className="text-sm font-bold">{name}</div>
                    <div className="text-xs font-medium text-gray-100">{description}</div>
                </div>
            </div>
            
            <div className="flex">
                <div><Checkbox defaultValue={defaultSelected} onValueChange={(val:boolean)=>{onValueChange?.(val)}}/></div>
            </div>
        </div>
    )
}

