import { AAvatar } from "./AAvatar"

interface Props {
    src:string
    name:string
    description:string
}

export const UserListAdmin = ({src,name,description}:Props)=>{
    return (
        <div className="flex flex-row items-center gap-5 w-fill h-11">
            <AAvatar src={src} size="md" rounded="full"/>
            <div className="flex flex-col items-start">
                <div className="text-sm font-bold">{name}</div>
                <div className="text-xs font-medium text-gray-100">{description}</div>
            </div>
            <div className="ml-6">Admin</div>
            <div className="ml-6">delete</div>
        </div>
    )
}
