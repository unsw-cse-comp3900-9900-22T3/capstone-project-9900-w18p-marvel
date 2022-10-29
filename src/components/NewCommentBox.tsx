import { TextInput } from "./TextInput";
import { useState, useEffect } from "react";
import { getUser, updateUserProfile } from "../api/user";
import { User } from "../api/type";
import { useApp } from "../App";
import { Avatar } from "./Avatar";
import SendIcon from '@mui/icons-material/Send';


import {
    addComment
} from "../api/comment";
import { uid } from "uid";

interface NewCommentBoxProps {
    TaskId: string;

}


//const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

export const NewCommentBox = ({ TaskId }: NewCommentBoxProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputcomment, setInputComment] = useState("");
    const { user, setUser } = useApp();

    const fetchData = async () => {

        console.log(user)

    }

    useEffect(() => {
        fetchData();
    }, []);


    return (

        <div className={`flex flex-col w-full h-auto mb-5`}>

            <div className={`flex item-start flex-row w-full py-5 bg-gray-50 items-center rounded-2xl relative`}>
                <div className={`flex w-20`}>
                    <Avatar
                        src={user?.photo?.downloadURL || ""}
                        size="lg"
                        rounded="full"
                    />
                </div>
                <div className={`ml-5 h-auto w-140 rounded-full break-all`}
                    onClick={() => {
                        setIsEditing(true);
                    }}>
                    <TextInput
                        placeholder="Write a Comment!..."
                        disabled={isEditing ? false : true}
                        onChange={(val) => {
                            setInputComment(val);
                        }}


                    /></div>
                <div className={`flex pr-5`}>
                    <SendIcon onClick={() => {
                        setIsEditing(false);
                        addComment(
                            '000',
                            TaskId,
                            user?.uid,
                            inputcomment)
                    }} />
                </div>
            </div>
        </div>
    );
};

//export { NewCommentBox };