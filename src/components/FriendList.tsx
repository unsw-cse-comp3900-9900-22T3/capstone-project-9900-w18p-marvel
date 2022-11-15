import { FriendBox } from "../components/FriendBox";
import { useApp } from "../App";
import { getUser } from "../api/user";

import { getApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { delay } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { queryMyProjects } from "../api/project";
import { Project } from "../api/type";






interface FriendListProps {
    
    
}


const FriendList = ({}: FriendListProps) => {
    const { user, projectId, setProjectId } = useApp();

    const [data, setData] = useState<Array<Project>>([]);
    const navigate = useNavigate();

    let observer: any = null;

    const refetch = async (userId: string) => {
        if (userId) {
        const data = await queryMyProjects(userId);
        setData(data);
        }
    };
    useEffect(() => {
        if (user?.uid) {
          const app = getApp();
          const db = getFirestore(app);
          if (observer) observer();
          const q = query(
            collection(db, "projectcollaborators"),
            where("userId", "==", user.uid)
          );
          observer = onSnapshot(q, (querySnapshot) => {
            if (user?.uid) refetch(user.uid);
          });
          return () => {
            if (observer) observer();
          };
        }
        if (user?.uid) refetch(user?.uid);
      }, [user]);

    return (
        <div className="mr-8 flex flex-col">
            {data.map((item: any) => (
                <FriendBox UserId={item.id} FriendName={item.title} Busy={item.id} src={item.photoURL.downloadURL}></FriendBox>
          ))}
        </div>
    );
};

export { FriendList };

  
            