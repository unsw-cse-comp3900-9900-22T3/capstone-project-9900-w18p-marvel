import { useEffect, useState } from "react";
import { downloadFile } from "../api/storage";
import { queryTasksByProjectId } from "../api/task";
import { getUser, requestConnection, updateUserProfile } from "../api/user";
import { useApp } from "../App";
import { Button } from "../components/Button";

export const APITest = () => {
  const { user, setUser,invitations } = useApp();
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
          queryTasksByProjectId("");
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
              await updateUserProfile(user.uid, undefined, undefined, file);

            } else {
              alert("user is null");
            }
          }}
        />
      </div>
      <div className="flex gap-2">
        <img src={user?.photoURL || ""} className="w-8 h-8" />
        <Button
          theme={"blue"}
          size={"hug"}
          label={"Get My Photo"}
          onClick={async () => {
            if (user?.uid) {
              const userInfo = await getUser(user.uid,user);
              if(userInfo?.photoURL){
                downloadFile(
                  userInfo.photoURL,
                  (url) => {
                    setUser?.({...user,photoURL:url});
                  },
                  (error) => {},
                  "url"
                );
              }
            } else {
              alert("user is null");
            }
          }}
        />
      </div>
    </div>
  );
};
