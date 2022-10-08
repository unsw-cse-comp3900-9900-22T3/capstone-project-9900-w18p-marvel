import { Button } from "./Button"

export const Navbar = ()=>{
    return (
        <div className="flex flex-row justify-end items-center w-full h-24 p-6">
            <Button theme={"blue"} label={"Start Project"} size={"hug"}></Button>
            
        </div>
    )
}