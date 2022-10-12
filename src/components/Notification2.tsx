import { AAvatar } from "./AAvatar"

interface Props {
    src:string
    name:string
    description:string
}


export const Notification2 = ({src,name,description}:Props)=>{
    return (
        <div className="flex flex-row items-center gap-4 w-[432px] h-24 bg-gray-50 rounded-xl">
            <div className="ml-5">
                <AAvatar src={src} size="md" rounded="full"/>
            </div>
            <div className="flex flex-col items-start">
                <div className="text-sm font-bold">{name}</div>
                <div className="text-xs font-medium text-gray-100">{description}</div>
            </div>
        </div>
    )
}