import { useEffect } from "react";
import { queryTasks, requestConnection } from "../api/task"
import { useApp } from "../App";
import { Button } from "../components/Button"

export const APITest = ()=>{
    const {user,invitations} = useApp()
    useEffect(()=>{
        if(invitations){
            console.log("invitation change:",invitations)
        }
    },[invitations])
    return (
      <>
        <Button
          theme={"blue"}
          size={"hug"}
          label={"Get All Tasks"}
          onClick={() => {
            queryTasks();
          }}
        />
        <Button
          theme={"blue"}
          size={"hug"}
          label={"Invite"}
          onClick={() => {
            if(user?.uid){
                requestConnection(user.uid,user.uid,new Date());
            }else{
                alert('user is null')
            }
          }}
        />
      </>
    );
}