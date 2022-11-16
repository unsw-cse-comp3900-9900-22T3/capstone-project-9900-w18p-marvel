import React, { useEffect, useState } from "react";
import { queryConnectedTasks } from "../api/taskcollaborator";
import { Task, User } from "../api/type";
import { getUser } from "../api/user";
import { useApp } from "../App";
import { ProjectCard } from "./ProjectCard";

export const ProfileFriendInfo = ({ UserId }: props) => {
    const { user } = useApp()
    const [User, setUser] = useState<User>()
    const [task, setTask] = useState<Array<Task>>()
    const fetch = async () => {
        const U = await getUser(UserId)
        if (U) setUser(U)
        if (user?.uid) {
            const G = await queryConnectedTasks(user?.uid, UserId)
            setTask(G)
        }
        console.log(U)

    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <div className="flex flex-col px-5 w-auto h-auto bg-white-100 rounded-[32px] pb-5">
            <div className="text-2xl w-auto text-center h-12 text-neutral-900 mt-4">Friend's Profile</div>
            <div className="text-xl">
                <div className="mt-3">Name:</div>
                <div className="mt-1 italic">{User?.displayName}</div>
                <div className="mt-3">Email:</div>
                <div className="mt-1 italic">{User?.email}</div>

            </div>
        </div>
    )
}