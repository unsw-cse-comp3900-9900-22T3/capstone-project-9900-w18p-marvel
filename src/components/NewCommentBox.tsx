import { TextInput } from "./TextInput";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
interface NewCommentBoxProps {
    MyAvator: string;

}


//const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

export const NewCommentBox = ({ MyAvator }: NewCommentBoxProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputcomment, setInputComment] = useState("");
    return (
        <div className={`flex flex-col w-full h-auto mb-5`}>

            <div className={`flex item-start flex-row w-full bg-gray-50 items-center rounded-2xl relative`}>
                <div className={`flex w-20`}>
                    <img src={MyAvator} className={`ml-5 w-10 h-10 rounded-full`} />
                </div>
                <div className={`ml-5 h-auto w-full rounded-full break-all`}
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
                    }} />
                </div>
            </div>
        </div>
    );
};

//export { NewCommentBox };