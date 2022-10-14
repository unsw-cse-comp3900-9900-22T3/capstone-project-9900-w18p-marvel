import { getApp } from "firebase/app";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import {
  addDoc,
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
import { deleteFile, uploadFile } from "./storage";
import { Resource, User } from "./type";

export const createUser = async (userId:string,user: User) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "users", userId), user);
};

export const updateUserProfile = async (
  userId: string,
  username: string | undefined,
  email: string | undefined,
  image: File | undefined,
  onComplete: (user: User) => void
) => {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    if (username) {
      await updateDoc(doc(db, "users", userId), {
        name: username,
      });
      await updateProfile(user, { displayName: username });
      onComplete?.({
        uid: user.uid,
        displayName: user.displayName!,
        email: user.email!,
      });
    }
    if (email) {
      await updateDoc(doc(db, "users", userId), {
        email: email,
      });
      await updateEmail(user, email);
      onComplete?.({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: { downloadURL: "", storagePath: "" },
      } as User);
    }
    if (image) {
      const userInfo = await getUser(userId);
      if (userInfo?.photoURL?.storagePath) {
        deleteFile(
          userInfo?.photoURL?.storagePath,
          () => {
            uploadFile(
              image,
              "image",
              () => {},
              (error) => {
                console.log("updateUser>>error:", error);
              },
              async (url, storagePath) => {
                await updateDoc(doc(db, "users", userId), {
                  portrait: {
                    downloadURL: url,
                    storagePath: storagePath,
                  } as Resource,
                });
                if (user) {
                  await updateProfile(user, { photoURL: url });
                  onComplete?.({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: { downloadURL: "", storagePath: "" },
                  } as User);
                }
              }
            );
          },
          (error) => {}
        );
      }
    }
  } else {
    alert("user is null");
  }
};

export const getUser: (uid: string) => Promise<User | null> = async (
  uid: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...(docSnap.data() as User) } as User;
  } else {
    return null;
  }
};

export const queryAllUsers: (keyword: string) => Promise<Array<User>> = async (
  keyword: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "users"));
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
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
