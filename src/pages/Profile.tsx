import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../api/type";
import { getUser, updateUserProfile } from "../api/user";
import { useApp } from "../App";
import { Echarts } from "../components/Echarts";
import { FriendList } from "../components/FriendList";
import { TasklistinProfile } from "../components/TasklistinProfile";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileSummary } from "../components/ProfileSummary";

// import { Avatar } from "./Avatar";
// import { Button } from "./Button";
// import { TextInput } from "./TextInput";

interface ProfileProps { }
export const Profile = ({ }: ProfileProps) => {
    const { user } = useApp();

    return (
        <div className="relative w-full h-full flex flex-col justify-items-center">
            <div className="relative w-full m-4 ml-12 text-sm text-gray-100 font-bold">
                MY PROFILE
            </div>
            <div className="relative bg-white-100 m-2 ml-8 mr-8 rounded-lg ">
                <ProfileCard />
            </div>

            <div className="overflow-y-scroll">
                <div className="m-4 ml-12 text-sm text-gray-100 font-bold">
                    MY CONNECTED TASK MASTERS
                </div>
                <div className={`bg-white-100 w-auto h-96 m-2 ml-8 mr-8 rounded-lg overflow-scroll`}>
                    <div className="m-8">
                        <FriendList></FriendList>
                    </div>
                </div>

                <div className="m-4 ml-12 text-sm text-gray-100 font-bold">
                    MY ASSIGNED TASK LIST
                </div>
                <div className={`bg-white-100 w-auto h-96 m-2 ml-8 mr-8 rounded-lg overflow-scroll`}>
                    <div className="m-8">
                        <TasklistinProfile></TasklistinProfile>
                    </div>
                </div>
                <div className="m-4 ml-12 text-sm text-gray-100 font-bold">
                    MY DAILY PROGRESS
                </div>
                <div className={`bg-white-100 w-auto h-96 m-2 ml-8 mr-8 rounded-lg overflow-scroll`}>
                    <div className="m-8">
                        <Echarts id={""} data1={[]} data2={[]}>

                        </Echarts>
                    </div>
                </div>
            </div>
        </div>
    );
};
