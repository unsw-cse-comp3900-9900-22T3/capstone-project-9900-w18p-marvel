import { getApp } from "firebase/app";
import {
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Fuse from "fuse.js";
import { uid } from "uid";
import { getInvitation } from "./invitation";
import { addProjectCollaborator } from "./projectCollaborator";
import { deleteFile, uploadFile } from "./storage";
import { Resource, User } from "./type";

export const createUser = async (userId: string, user: User) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, "users", userId), user);
};

export const updateUserProfile = async (
  userId: string,
  username: string | null,
  email: string | null,
  image: File | null,
  onComplete: (user: User) => void
) => {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth();
  const authUser = auth.currentUser;

  if (authUser) {
    const userInfo = await getUser(userId);
    if (userInfo) {
      // const credential = promptForCredentials();

      // reauthenticateWithCredential(user, credential)
      // .then(async () => {
      if (username) {
        await updateDoc(doc(db, "users", userId), {
          name: username,
        });
        // await updateProfile(user, { displayName: username });
        onComplete?.({ ...userInfo, uid: userId, displayName: username });
      }
      if (email) {
        await updateDoc(doc(db, "users", userId), {
          email: email,
        });
        // await updateEmail(user, email);
        onComplete?.({ ...userInfo, uid: userId, email: email } as User);
      }
      if (image) {
        if (userInfo?.photo) {
          if (userInfo.photo.storagePath) {
            deleteFile(
              userInfo?.photo?.storagePath,
              () => {},
              (error) => {}
            );
          }
          uploadFile(
            image,
            "avatar",
            () => {},
            (error) => {
              console.log("updateUser:error:", error);
            },
            async (downloadURL, storagePath) => {
              await updateDoc(doc(db, "users", userId), {
                photo: {
                  downloadURL: downloadURL,
                  storagePath: storagePath,
                } as Resource,
              });
              if (userInfo) {
                // await updateProfile(user, { photoURL: url });
                onComplete?.({
                  ...userInfo,
                  uid: userId,
                  photo: { downloadURL, storagePath },
                } as User);
              }
            }
          );
        }
      }
      // })
      // .catch((error) => {
      //   alert(error)
      // });
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
    return { ...(docSnap.data() as User), uid: uid } as User;
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
    data.push({ uid: doc.id, ...doc.data() });
  });
  if (keyword === "") {
    return data;
  } else {
    const fuse = new Fuse(data, { keys: ["email"] });
    const result = fuse.search(keyword);
    return result.map((item) => item.item as User);
  }
};
