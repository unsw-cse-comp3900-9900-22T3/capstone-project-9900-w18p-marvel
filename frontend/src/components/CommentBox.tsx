import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Avatar } from "./Avatar";
import { getUser, updateUserProfile } from "../api/user";
import React, { useEffect, useState } from "react";
import { useApp } from "../App";
import Box from '@mui/material/Box';
import { delay } from "../utils/promise";

import {
    deleteComment
} from "../api/comment";



import {
    queryComment
} from "../api/comment";


interface CommentboxProps {
    TaskId?: string;
    CommentId: string;
    CommentorID: string;
    Comments?: string;
    CommentDate?: string;
    OwnerId?: string;
    handleGetComment: any;


}


const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

const waste_icon = "https://freesvg.org/img/trash.png"

const CommentBox = ({ TaskId, Comments, CommentDate, CommentorID, CommentId, OwnerId, handleGetComment }: CommentboxProps) => {
    const [commnetuser, setcommnetuser] = useState<any>({});
    const { user, setUser } = useApp();
    const [inputcomment, setInputComment] = useState({});

    const fetchData = async () => {
        const userinfo = await getUser(CommentorID);
        console.log(userinfo)
        await delay(1000);
        setcommnetuser(userinfo)
        console.log(TaskId)
        console.log(user?.uid)
        console.log(Comments)



    }


    useEffect(() => {
        fetchData();
    }, [handleGetComment]);


    const handleDelete = async () => {
        console.log(CommentId)
        await deleteComment(CommentId);
        await delay(1000);
        await handleGetComment();
        fetchData();
    };







    return (
        <div className={`flex flex-col w-176 h-auto mb-2`}>


            <div className={`flex item-start flex-row w-176 h-auto pl-5 py-5 bg-gray-50 rounded-2xl relative`}>
                <div className={`flex w-20`}>
                    <Avatar
                        src={commnetuser?.photo?.downloadURL || ""}
                        size="lg"
                        rounded="full"
                    />

                </div>
                <div className={`flex flex-col w-176 h-auto gap-3`}>
                    <div className={`text-sm font-bold text-lg`}>{commnetuser?.name ? commnetuser?.name : "Anonymous"}</div>
                    <div className={`text-xs w-149 break-all pr-10 h-auto text-gray-100`}>{Comments}</div>

                </div>
                <div className={`flex flex-row absolute right-5 items-center`}>
                    <div className={`flex pr-2 text-xs text-gray-100`}>{CommentDate}</div>

                    <Box className={`hover:bg-slate-300 text-slate-500 rounded-[14px]`}>
                        <DeleteForeverOutlinedIcon onClick={handleDelete} />
                    </Box>



                </div>

            </div>
        </div>
    );
};

export { CommentBox };