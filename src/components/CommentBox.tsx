import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Avatar } from "./Avatar";
import { getUser, updateUserProfile } from "../api/user";
import React, { useEffect, useState } from "react";

import {
    deleteComment
} from "../api/comment";

interface CommentboxProps {
    TakeId?: string;
    CommentorID?: string;
    Comments?: string;
    CommentDate?: string;
    OwnerID?: string;

}


const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

const waste_icon = "https://freesvg.org/img/trash.png"

const CommentBox = ({ TakeId, Comments, CommentDate, CommentorID, OwnerID }: CommentboxProps) => {
    const [user, setuser] = useState(true);
    const fetchData = async () => {
        const userinfo = await getUser(CommentorID);
        console.log(userinfo)
        setuser(userinfo)
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={`flex flex-col w-176 h-auto mb-2`}>


            <div className={`flex item-start flex-row w-176 h-auto pl-5 py-5 bg-gray-50 rounded-2xl relative`}>
                <div className={`flex w-20`}>
                    <Avatar
                        src={user?.photo?.downloadURL || ""}
                        size="lg"
                        rounded="full"
                    />

                </div>
                <div className={`flex flex-col w-176 h-auto gap-3`}>
                    <div className={`text-sm font-bold text-lg`}>{user?.displayName ? user?.displayName : "Anonymous"}</div>
                    <div className={`text-xs w-149 break-all pr-10 h-auto text-gray-100`}>{Comments}</div>
                    <div className={`text-xs text-gray-100 pt-1`}>Reply</div>
                </div>
                <div className={`flex flex-row absolute right-5 items-center`}>
                    <div className={`flex pr-2 text-xs text-gray-100`}>{CommentDate}</div>

                    <div>

                        <DeleteForeverOutlinedIcon onClick={() => {
                            deleteComment(TakeId);
                        }} />
                    </div>



                </div>

            </div>
        </div>
    );
};

export { CommentBox };