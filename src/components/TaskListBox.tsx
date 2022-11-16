import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Avatar } from "./Avatar";
import { getUser, updateUserProfile } from "../api/user";
import React, { useEffect, useState } from "react";
import { useApp } from "../App";
import Box from '@mui/material/Box';
import { delay } from "../utils/promise";
import { getTask } from "../api/task";
import { NightShelter } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { TaskDetail } from "./TaskDetail";
import { Popup } from "./Popup";
import { getProject } from "../api/project";
import Button from '@mui/material/Button';


interface TaskListBoxProps {
    TaskID: string;

}


// const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

// const waste_icon = "https://freesvg.org/img/trash.png"

const TaskListBox = ({ TaskID }: TaskListBoxProps) => {
    const [taskdata, setTaskData] = useState<any>([]);
    const [pjdata, setPjData] = useState<any>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);


    const fetchProject = async (ProjectID: string) => {
        const projectdata = await getProject(ProjectID);
        setPjData(projectdata)
        console.log(projectdata);
    }


    const fetchdata = async (TaskID: string) => {

        const data = await getTask(TaskID);

        setTaskData(data);
        console.log(data);
        await delay(1000);

        const projectdata = await getProject(data?.projectId);
        setPjData(projectdata);


    };





    useEffect(() => {
        fetchdata(TaskID);

    }, [open, TaskID]);


    // const fetchData = async () => {
    //     const userinfo = await getUser(UserId);
    //     console.log(userinfo)
    //     await delay(1000);
    //     // setcommnetuser(userinfo)
    //     // console.log(UserId)
    //     console.log(user?.uid)
    //     // console.log(Comments)

    // }


    // {user?.photo?.downloadURL || ""}

    return (
        <>
            {!(taskdata === null) && (
                < div className={`flex flex-row w-full h-auto mb-2`}>


                    <div className={`flex flex-row w-full h-auto pl-5 py-5 bg-gray-50 rounded-2xl relative`}>
                        <div className={`flex w-auto pt-1`}>
                            <AssignmentIcon />
                        </div>
                        <div className={`flex justify-between w-full h-auto gap-4`}>
                            <div className={`font-bold w-auto text-lg text-blue-600`}>
                                {taskdata?.title ? taskdata?.title : "No Name!"}
                            </div>
                            <div className={`font-bold w-auto text-lg`} onClick={() => {
                                setSelectedTaskId(taskdata.id);
                                setOpen(true);
                            }}>
                                <Button variant="outlined">View Task</Button>


                            </div>
                            {selectedTaskId && (
                                <Popup
                                    open={open}
                                    onClose={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <TaskDetail id={selectedTaskId} />
                                </Popup>
                            )}
                            <div className={`text-lg w-auto text-blue-600/75`}>
                                Status: {taskdata?.status}
                            </div>
                            <div className={`text-lg w-auto text-blue-600/75`}>
                                Due Date: {taskdata?.dueDate?.toDateString()}
                            </div>
                            <div className={`text-lg w-auto text-blue-600/75`}>
                                Project Name: {pjdata?.title}
                            </div>


                        </div>
                    </div>


                </div >
            )
            }
        </>



    );
};

export { TaskListBox };