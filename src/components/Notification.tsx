import { AAvatar } from "./AAvatar"

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
                    <AAvatar src={src} size="md" rounded="full"/>
                </div>
                <div className="flex flex-col items-start ml-4">
                    <div className="text-sm font-bold">{name}</div>
                    <div className="text-xs font-medium text-gray-100">{description}</div>
                </div>
            </div>
            <div className="flex pr-6">
                <div className="ml-4">Confirm</div>
                <div className="ml-2">Delete</div>
            </div>
            
        </div>
    )
}