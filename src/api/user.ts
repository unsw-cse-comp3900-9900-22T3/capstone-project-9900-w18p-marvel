import { getApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Fuse from "fuse.js";
import { uid } from "uid";
import { uploadFile } from "./storage";
import { User } from "./type";

export const updateUserProfile = async (
  userId: string,
  username: string | undefined,
  email: string | undefined,
  image: File | undefined
) => {
  const app = getApp();
  const db = getFirestore(app);
  if (username) {
    await updateDoc(doc(db, "users", userId), {
      name: username,
    });
  }
  if (email) {
    await updateDoc(doc(db, "users", userId), {
      email: email,
    });
  }
  if (image) {
    uploadFile(
      image,
      "image",
      () => {},
      (error) => {
        console.log("updateUser>>error:", error);
      },
      async (storagePath) => {
        await updateDoc(doc(db, "users", userId), {
          photoURL: storagePath,
        });
      }
    );
  }
};

export const getUser:(uid:string,user:User)=>Promise<User|undefined> = async (uid: string,user:User) => {
  const app = getApp();
  const db = getFirestore(app);
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: uid, ...user, ...docSnap.data() } as User;
  } else {
    return undefined
  }
};

export const queryAllUsers:(keyword:string)=>Promise<Array<User>> = async (keyword: string) => {
  const app = getApp();
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "users"));
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data });
  });
  const fuse = new Fuse(data, { keys: ["name", "email"] });
  const result = fuse.search(keyword);
  return result.map((item) => item.item as User);
};

export const requestConnection = async (
    inviteeId: string,
    createdBy: string,
    createdAt: Date
  ) => {
    const app = getApp();
    const db = getFirestore(app);
    await setDoc(doc(db, "invitations", uid(20)), {
      createdBy: createdBy,
      createdAt: createdAt,
      inviteeId: inviteeId,
    });
  };
  
  export const answerConnection = async (
    invitationId: string,
    accept: boolean,
    createdBy: string,
    createdAt: Date
  ) => {
    const app = getApp();
    const db = getFirestore(app);
  
    if (accept) {
      const docRef = doc(db, "connections", invitationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await setDoc(doc(db, "connections", uid(20)), {
          createdBy: docSnap.data().createdBy,
          createdAt: createdAt,
          approvedBy: createdBy,
        });
      } else {
      }
    } else {
    }
  };
  
  