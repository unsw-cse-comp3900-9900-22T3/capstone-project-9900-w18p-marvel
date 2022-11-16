import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Avatar } from "./Avatar";
import { getUser, updateUserProfile } from "../api/user";
import React, { useEffect, useState } from "react";
import { useApp } from "../App";
import Box from '@mui/material/Box';
import { delay } from "../utils/promise";
import { Popup } from "./Popup";
import { ProfileFriendInfo } from "./ProfileFriendInfo"
import Button from '@mui/material/Button';



interface FriendboxProps {
    UserId: string;
    FriendName: string;
    Busy: string;
    src: string;
}


// const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

// const waste_icon = "https://freesvg.org/img/trash.png"

const FriendBox = ({ UserId, FriendName, Busy, src }: FriendboxProps) => {
    const { user, setUser } = useApp();


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

    const [profileOpen, setprofileOpen] = useState<boolean>(false)
    return (
        <div className={`flex flex-row w-full h-auto mb-2`}>
            <div className={`flex flex-row w-full h-auto pl-5 py-5 bg-gray-50 rounded-2xl relative`}>
                <div className={`flex w-40`}>
                    <Avatar
                        src={src}
                        size="lg"
                        rounded="full"
                    />
                </div>
                <div className={`flex justify-start w-full h-auto gap-10`}>
                    <div className={`font-bold w-80 text-lg`}>
                        {FriendName}
                    </div>
                    <div className={`font-bold w-64 text-lg`}>
                        <Button variant="outlined" onClick={() => setprofileOpen(true)}>View Profile</Button>
                        <Popup
                            open={profileOpen}
                            onClose={() => {
                                setprofileOpen(false);
                            }}
                        >
                            <ProfileFriendInfo
                                UserId={UserId}
                                onComplete={() => {
                                    setprofileOpen(false);
                                }}
                            />
                        </Popup>
                    </div>
                    <div className={`text-sm w-64 text-gray-100`}>
                        Next Week's Workload
                    </div>
                    <div className={`text-sm w-64 text-gray-100`}>
                        {Busy}
                    </div>

                </div>
            </div>
        </div>
    );
};

export { FriendBox };