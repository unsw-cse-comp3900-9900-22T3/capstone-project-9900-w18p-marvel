import React from "react";
import { ProjectCard } from "./ProjectCard";
import { user } from "../api/user"

export const ProfileFriendInfo = () => {
    
    return(
        <div className="flex flex-col w-60">
            <div className="text-2xl w-60 text-center h-12 text-neutral-900">friend profile</div>
            <span>Email:</span>
            <span>Name:</span>
            <span>connected projects:</span>

        </div>
    )
}