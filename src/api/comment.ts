import { getApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { uid } from "uid";
import { Comment } from "./type";

export const addComment = async (
  taskId: string,
  userId: string,
  content: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "comments", uid(20)), {
    createdAt: new Date(),
    createdBy: userId,
    content: content,
    taskId: taskId,
  });
};

export const deleteComment = async (commentId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  await deleteDoc(doc(db, "comments", commentId));
};

export const queryAllComments: () => Promise<Array<Comment>> = async () => {
  const app = getApp();
  const db = getFirestore(app);

  const querySnapshot = await getDocs(collection(db, "comments"));
  const data: Array<Comment> = [];
  querySnapshot.forEach((doc) => {
    if (doc.id !== "placeholder") {
      data.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      } as Comment);
    }
  });

  return data;
};

export const queryComment: (taskId: string) => Promise<Array<Comment>> = async (
  taskId: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(collection(db, "comments"), where("taskId", "==", taskId));

  const querySnapshot = await getDocs(q);
  const data: Array<Comment> = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    } as Comment);
  });
  return data;
};

export const deleteAllComment = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const comments = await queryAllComments();
  comments.forEach(async (c) => {
    console.log("deleting comment:", c.id);
    deleteDoc(doc(db, "comments", c.id));
  });
};
