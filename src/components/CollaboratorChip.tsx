import { Avatar } from "./Avatar"

interface Props{
    avatars:Array<string>
    onClick?:()=>void
}

export const CollaboratorChip = ({avatars,onClick}:Props)=>{
    return (
        <div className={`flex items-center h-8 px-2 ${avatars.length>0?"":"bg-gray-50"} rounded-full`} onClick={onClick}>
            {avatars.length===0 && (
                <div className="text-gray-100 text-xs">Pick Collaborators Here</div>
            )}
            {avatars.map((item:string)=>(
                <Avatar size={"xs"} rounded={"full"} src={item} />
            ))}
        </div>
    )
}