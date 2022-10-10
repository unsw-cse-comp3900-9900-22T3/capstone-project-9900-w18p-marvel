import { AAvatar } from "./AAvatar"
import { Button } from "./Button"

interface Props {
    src:string
    name:string
    description:string
}

export const UserListAdmin = ({src,name,description}:Props)=>{
    return (
        <div className="flex flex-row items-center w-full h-11 justify-between">
            <div className="flex flex-row gap-4">
                <AAvatar src={src} size="md" rounded="full"/>
                <div className="flex flex-col items-start">
                    <div className="text-sm font-bold">{name}</div>
                    <div className="text-xs font-medium text-gray-100">{description}</div>
                </div>
            </div>

            <div className="flex flex-row items-center">
                <div className="ml-6">
                    <Button
                        theme="gray"
                        size="hug"
                        rounded="2xl" 
                        label={"Admin"}
                    ></Button>
                </div>
                <div className="ml-6">delete</div>
            </div>
            
        </div>
    )
}
