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
    uploadFile(file, "attachment", onProgress, onError, async (downloadURL,storagePath) => {
      await addDoc(collection(db, "attachments"), {
        createdAt: new Date(),
        createdBy: userId,
        resource: {downloadURL,storagePath},
        taskId: taskId,
      } as Attachment);
      onComplete?.(downloadURL);
    });
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

export const deleteAllAttachment = async () => {
  const app = getApp();
  const db = getFirestore(app);

  const querySnapshot = await getDocs(collection(db, "attachments"));
  const data: Array<Attachment> = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data(),createdAt:doc.data().createdAt.toDate() } as Attachment);
  });
  data.forEach((d) => {
    if(d.resource?.storagePath){
      deleteFile(
        d.resource.storagePath,
        async (storagePath) => {
          await deleteDoc(doc(db, "attachments", d.id));
        },
        (error) => {}
      );
    }
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
    return { id: attachmentId, ...docSnap.data(),createdAt:doc.data().createdAt.toDate() } as Attachment;
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
    data.push({ id: doc.id, ...doc.data(),createdAt:doc.data().createdAt.toDate() } as Attachment);
  });
  return data;
};
