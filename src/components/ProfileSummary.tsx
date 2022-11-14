import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../api/type";
import { getUser, updateUserProfile } from "../api/user";
import { useApp } from "../App";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { TextInput } from "./TextInput";



interface Props {
  onClickManageMember?: () => void;
}
export const ProfileSummary = ({onClickManageMember}: Props) => {
  

  // const [isEditing, setIsEditing] = useState(false);
  // const { user,setUser } = useApp(); //useApp 数据中心老板写的函数，
  // const [inputEmail, setInputEmail] = useState("");
  // const [uploading,setUploading] = useState<boolean>(false)
  

  return (
    <div className="flex flex-col">
      <div className="virtual-scroll-viewport">
        <div className="virtual-scroll-spacer"></div>
        <div className="virtual-scroll-list"></div>
      </div>


      <div>
        Connected Task Master list
      </div>
      <div className="flex flex-row bg-white-100 w-[690px] h-[100px] m-4">
        <div>
          project name
        </div>
      </div>

      <div className="flex flex-row bg-white-100 w-[690px] h-[100px] m-4">
        <div>
          project task
        </div>
      </div>
      <div className="flex flex-row bg-white-100 w-[690px] h-[100px] m-4">
        <div>
          project task
        </div>
      </div>
      {/* <Button
              theme={"gray"}
              size={"fill"}
              label={"Manage Members"}
              // prefix={<PlusIcon className="" />}
              onClick={() => {
                onClickManageMember?.();
              }}
            /> */}
    </div>
      // <div className="divide-y divide-gray-300">
      //   <div className="flex flex-basis auto ml-8 bg-white w-[690px] h-[100px]">
      //     <div className="transition-all mt-4 w-14 h-14 relative hover:scale-95">
      //       <input
      //         type={"file"}
      //         className="opacity-0 absolute inset-0 cursor-pointer"
      //         onChange={(e) => {
      //           const file = e.target.files?.[0];
      //           if (file && user?.uid) {
      //             setUploading(true);
      //             updateUserProfile(
      //               user.uid,
      //               null,
      //               null,
      //               file,
      //               (user: User) => {
      //                 setUser?.({ ...user, uid: user.uid });
      //                 setUploading(false);
      //               }
      //             );
      //           }
      //         }}
      //       />
      //       {uploading && (
      //         <div className="absolute w-full h-full flex justify-center items-center text-white-100">
      //           <CircularProgress color="primary" />
      //         </div>
      //       )}
      //       <Avatar
      //         src={user?.photo?.downloadURL || ""}
      //         size="xl"
      //         rounded="sm"
      //       />
      //     </div>
      //     <div className="text-lg font-bold text-black mt-6 ml-6">
      //       {user?.displayName}
      //     </div>
      //     <div className="text-sm font-light text-black mt-14 ml-[-85px]">
      //       {user?.email}
      //     </div>
      //   </div>
      //   <div className="flex flex-basis:| auto ml-8 bg-white w-[690px] h-[100px]">
      //     <div className="flex1 mt-2">
      //       <div className="text-sm font-bold text-gray-500 mt-4 mb-2 ml-6">
      //         EMAIL ADDRESS
      //       </div>
      //       <div className="text-sm font-bold text-black mb-4">
      //         <TextInput
      //           disabled={isEditing ? false : true}
      //           onChange={(val) => {
      //             setInputEmail(val);
      //           }}
      //           defaultValue={user?.email}
      //         />
      //       </div>
      //     </div>
      //     <div className="flex1 mt-2 ml-3">
      //       <div className="text-sm font-bold text-gray-500 mt-4 mb-2 ml-6">
      //         USER ID
      //       </div>
      //       <div className="text-sm font-bold text-black m-4">{user?.uid}</div>
      //     </div>
      //   </div>

      //   <div className="flex flex-basis: | auto ml-8 bg-white w-[690px] h-[100px]">
      //     <div className="mt-7">
      //       <Button
      //         theme="gray"
      //         size="hug"
      //         rounded="2xl"
      //         label="Edit Profile"
      //         onClick={() => {
      //           setIsEditing(true);
      //         }}
      //       />
      //     </div>
      //     <div className="mt-7 ml-[450px]">
      //       <Button
      //         theme="gray"
      //         size="hug"
      //         rounded="2xl"
      //         label="Save Profile"
      //         onClick={() => {
      //           setIsEditing(false);
      //           if (user)
      //             updateUserProfile(
      //               user.uid!,
      //               null,
      //               inputEmail,
      //               null,
      //               (user: User) => {
      //                 setUser?.({ ...user, uid: user.uid });
      //               }
      //             );
      //         }}
      //       />
      //     </div>
      //   </div>
      // </div>

  );
};

// export { ProfileCard };
