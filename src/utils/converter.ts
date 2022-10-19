import { uid } from "uid";

export const urlToFile = async (url: string) => {
  const response = await fetch(url);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], uid(20) + ".jpg", { type: blob.type });
  return file
};
