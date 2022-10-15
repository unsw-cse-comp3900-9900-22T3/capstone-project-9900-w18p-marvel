import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { uid } from "uid";

export type FileType = "image" | "file";
export type DownloadType = "url" | "file";

export const uploadFile = (
  file: File,
  type: FileType,
  onProgress: (progress: number) => void,
  onError: (error: any) => void,
  onComplete: (downloadURL:string,storagePath: string) => void
) => {
  if (file) {
    let folderName = "";
    if (type === "file") {
      folderName = "file";
    } else if (type === "image") {
      folderName = "image";
    }
    const storage = getStorage();
    const name = uid(20);
    const imgRef = ref(storage, name);
    const storagePath = `${folderName}/${name}`;
    const storageRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes);
          onProgress?.(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        onError?.(error);
      },
      () => {
        getDownloadURL(ref(storage, storagePath)).then((url)=>{
          console.log("upload complete:",url)
          onComplete?.(url,storagePath);
        })
      }
    );
  }
  return;
};

export const downloadFile = (
  storagePath: string,
  onComplete: (url: string) => void,
  onError: (error: any) => void,
  type: DownloadType
) => {
  const storage = getStorage();
  getDownloadURL(ref(storage, storagePath))
    .then((url) => {
      if (type === "file") {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
      } else {
        onComplete?.(url);
      }
    })
    .catch((error) => {
      onError?.(error);
    });
};

export const deleteFile = (
  storagePath: string,
  onComplete: (storagePath: string) => void,
  onError: (error: any) => void
) => {
  const storage = getStorage();

  const desertRef = ref(storage, storagePath);

  deleteObject(desertRef)
    .then(() => {
      onComplete?.(storagePath);
    })
    .catch((error) => {
      onError?.(error);
    });
};
