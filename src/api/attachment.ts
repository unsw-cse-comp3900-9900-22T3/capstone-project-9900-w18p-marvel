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
    uploadFile(file, "file", onProgress, onError, async (url) => {
      await addDoc(collection(db, "comments"), {
        createdAt: new Date(),
        createdBy: userId,
        resourceUrl: url,
        taskId: taskId,
      });
      onComplete?.(url);
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
        await deleteDoc(doc(db, "comments", attachmentId));
        onComplete?.(storagePath);
      },
      (error) => {
        onError?.(error);
      }
    );
  }
};

export const getAttachment: (
  attachmentId: string
) => Promise<Attachment | null> = async (attachmentId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const docRef = doc(db, "attachments", attachmentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: attachmentId, ...docSnap.data() } as Attachment;
  } else {
    return null;
  }
};

export const queryAttachment: (
  taskId: string
) => Promise<Array<Comment>> = async (taskId: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const q = query(collection(db, "comments"), where("taskId", "==", taskId));

  const querySnapshot = await getDocs(q);
  const data: Array<Comment> = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...(doc.data() as Comment) } as Comment);
  });
  return data;
};
