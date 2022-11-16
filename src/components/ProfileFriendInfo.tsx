import React, { useEffect, useState } from "react";
import { queryConnectedTasks } from "../api/taskcollaborator";
import { Task, User } from "../api/type";
import { getUser } from "../api/user";
import { useApp } from "../App";
import { ProjectCard } from "./ProjectCard";

export const ProfileFriendInfo = ({UserId}:props) => {
    const {user}=useApp()
    const [User,setUser]=useState<User>()
    const [task,setTask]=useState<Array<Task>>()
    const fetch = async ()=>{
        const U = await getUser(UserId) 
        if(U) setUser(U)
        if(user?.uid){
          const G=await queryConnectedTasks(user?.uid, UserId)
          setTask(G)
        }
        console.log(U)
        
    }
    useEffect (()=>{
        fetch()
    },[])
    return(
        <div className="flex flex-col w-60 bg-white">
            <div className="text-2xl w-60 text-center h-12 text-neutral-900">profile</div>
            <span>Email:</span>
            <span>{User?.email}</span>
            <span>Name:</span>
            <span>{User?.displayName}</span>
            <span>connected tasks:</span>
            <span>{}</span>
        </div>
    )
}