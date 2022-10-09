import { AAvatar } from "./AAvatar"
import { Checkbox } from "./Checkbox"

interface Props {
    src:string
    name:string
    description:string
}

export const UserListItem = ({src,name,description}:Props)=>{
    return (
        <div className="flex flex-row items-center gap-5 w-fill h-11">
            <AAvatar src={src} size="md" rounded="full"/>
            <div className="flex flex-col items-start">
                <div className="text-sm font-bold">{name}</div>
                <div className="text-xs font-medium text-gray-100">{description}</div>
            </div>
            <div className="ml-8"><Checkbox defaultValue={true}/></div>
        </div>
    )
}

