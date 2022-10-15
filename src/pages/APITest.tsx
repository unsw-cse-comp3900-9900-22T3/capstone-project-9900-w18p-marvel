import { useEffect, useState } from "react";
import { downloadFile } from "../api/storage";
import { queryAllTasksByProjectId } from "../api/task";
import { getUser, requestConnection, updateUserProfile } from "../api/user";
import { useApp } from "../App";
import { Button } from "../components/Button";

export const APITest = () => {
  const { user,setUser,invitations } = useApp();
  useEffect(() => {
    if (invitations) {
      console.log("invitation change:", invitations);
    }
  }, [invitations]);
  useEffect(()=>{
    console.log("user:",user)
  },[user])
  const [file, setFile] = useState<File>();
  return (
    <div className="flex flex-col gap-2 p-4">
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Get All Tasks"}
        onClick={() => {
          queryAllTasksByProjectId("");
        }}
      />
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Invite"}
        onClick={() => {
          if (user?.uid) {
            requestConnection(user.uid, user.uid, new Date());
          } else {
            alert("user is null");
          }
        }}
      />
      <div className="flex flex-row gap-2">
        <input
          type={"file"}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button
          theme={"blue"}
          size={"hug"}
          label={"Update My Photo"}
          onClick={async () => {
            if (user?.uid && file) {
              await updateUserProfile(
                user.uid,
                undefined,
                undefined,
                file,
                (user) => {
                  console.log("xxx", user,setUser);
                  setUser?.(user);
                }
              );
            } else {
              alert("user is null");
            }
          }}
        />
      </div>
    </div>
  );
};
