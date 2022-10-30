import { getApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { deleteFile, uploadFile } from "./storage";
import { Attachment } from "./type";

export const addAttachment = async (
  taskId: string,
  userId: string,
  file: File,
  onProgress: (progress: number) => void,
  onError: (error: any) => void,
  onComplete: (url: string) => void
) => {
  const app = getApp();
  const db = getFirestore(app);

  if (file) {
    uploadFile(
      file,
      "file",
      onProgress,
      onError,
      async (downloadURL, storagePath) => {
        await addDoc(collection(db, "attachments"), {
          createdAt: new Date(),
          createdBy: userId,
          resource: { downloadURL, storagePath },
          taskId: taskId,
          title: file.name,
        } as Attachment);
        onComplete?.(downloadURL);
      }
    );
  }
};

export const deleteAttachment = async (
  attachmentId: string,
  onError: (error: any) => void,
  onComplete: (storagePath: string) => void
) => {
  const app = getApp();
  const db = getFirestore(app);

  const attachment = await getAttachment(attachmentId);
  if (attachment) {
    deleteFile(
      attachment.resource.storagePath,
      async (storagePath) => {
        await deleteDoc(doc(db, "attachments", attachmentId));
        onComplete?.(storagePath);
      },
      (error) => {
        onError?.(error);
      }
    );
  }
};

export const queryAllAttachments: () => Promise<
  Array<Attachment>
> = async () => {
  const app = getApp();
  const db = getFirestore(app);

  const querySnapshot = await getDocs(collection(db, "attachments"));
  const items: Array<Attachment> = [];
  querySnapshot.forEach((doc) => {
    if (doc.id !== "placeholder") {
      items.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      } as Attachment);
    }
  });

  return items;
};

export const deleteAllAttachments = async () => {
  const app = getApp();
  const db = getFirestore(app);
  const projects = await queryAllAttachments();
  projects.forEach(async (p) => {
    console.log("deleting attachment:", p.id);
    await deleteDoc(doc(db, "attachments", p.id));
  });
};

export const getAttachment: (
  attachmentId: string
) => Promise<Attachment | null> = async (attachmentId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const docRef = doc(db, "attachments", attachmentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: attachmentId,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toDate(),
    } as Attachment;
  } else {
    return null;
  }
};

export const queryAttachment: (
  taskId: string
) => Promise<Array<Attachment>> = async (taskId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(collection(db, "attachments"), where("taskId", "==", taskId));

  const querySnapshot = await getDocs(q);
  const data: Array<Attachment> = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    } as Attachment);
  });
  return data;
};
