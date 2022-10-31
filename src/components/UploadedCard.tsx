import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { getUser, updateUserProfile } from "../api/user";
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { useApp } from "../App";
import { deleteAttachment } from '../api/attachment';
import { delay } from "../utils/promise";

interface UploadedCardProps {
  FileID: number;
  FilePic?: string; //Depending on the file format for different Pic
  FileName: string;
  FileAddedTime: string;
  FileDownloadLink: string;
  UploadedBy: string;
  handleGetattached: any;

}


const temp_img_address = "https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_960_720.png"
const waste_icon = "https://freesvg.org/img/trash.png"

const UploadedCard = ({ FileID, FilePic, FileName, FileAddedTime, FileDownloadLink, UploadedBy, handleGetattached }: UploadedCardProps) => {

  console.log(FileID)

  const [uploaduser, setUploaduser] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const userinfo = await getUser(UploadedBy);

    console.log(userinfo)
    setUploaduser(userinfo)

  }



  const fetchAttach = async (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);


  };

  const handleDelete = async () => {
    await deleteAttachment(FileID, null, null);
    console.log('checl')
    await delay(2000);
    await handleGetattached();
  };

  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div className={`flex flex-col w-176 h-auto mb-2`}>


      <div className={`flex item-start items-center flex-row w-166 h-32 bg-gray-50 rounded-2xl relative ml-10`}>
        <div className={`flex h-32 w-30 items-center pl-5`}>
          <img src={temp_img_address} className={`h-20 w-20`} />
        </div>
        <div className={`flex flex-row w-full pr-5 h-auto justify-between`}>
          <div className={`flex flex-col ml-5 w-auto h-auto gap-3`} >
            <div className={`text-xl font-bold`}>{FileName}</div>
            <div className={`text-xs text-gray-100`}>Added at {FileAddedTime}, Created by {uploaduser?.displayName ? commnetuser?.displayName : "Anonymous"}</div>
          </div>

          <Box className={`hover:bg-slate-300 text-slate-500 rounded-[14px] h-6`}>
            <DeleteForeverOutlinedIcon onClick={handleDelete} />
          </Box>

        </div>

      </div>
    </div >
  );
}

export { UploadedCard };

