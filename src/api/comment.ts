import { getApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "firebase/firestore";

export const addComment = async (
  taskId: string,
  userId: string,
  content: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  await addDoc(collection(db, "comments"), {
    createdAt: new Date(),
    createdBy: userId,
    content: content,
    taskId: taskId,
  });
};

export const deleteComment = async (commentId:string)=>{
    const app = getApp();
    const db = getFirestore(app);
    await deleteDoc(doc(db,"comments",commentId))
}

export const queryComment: (
    taskId: string
  ) => Promise<Array<Comment>> = async (taskId: string) => {
    const app = getApp();
    const db = getFirestore(app);
    const q = query(
      collection(db, "comments"),
      where("taskId", "==", taskId)
    );
  
    const querySnapshot = await getDocs(q);
    const data: Array<Comment> = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() as Comment } as Comment);
    });
    return data;
  };
