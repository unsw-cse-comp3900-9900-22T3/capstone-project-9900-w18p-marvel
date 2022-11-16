//import { Avatar } from "./Avatar";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Popup } from "./Popup";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { TaskUserList } from "./TaskUserList";
import React, { useEffect, useState } from "react";
import { queryCollaboratorsInTask } from "../api/taskcollaborator";
import { delay } from "../utils/promise";
import { getUser, queryAllUsers } from "../api/user";
import { useApp } from "../App";
import { TextInput } from "./TextInput";
import { TextInput_forDes } from "./TextInput_forDes";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { updateTask } from "../api/task";
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface TaskInfoBlockProps {
  TaskID: string;
  TaskName: string;
  DueDate: any;
  Description: string;
  UserRole?: string;
  ProjectId: string;
}

const img_address =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAADY2NgjIyPz8/NjY2O5ubn8/PwcHBzKysp7e3tsbGyFhYWSkpLNzc2goKBRUVEICAji4uLCwsKYmJjp6empqal2dnYXFxczMzOMjIywsLBWVlY5OTnk5OQrKytBQUEnJyc+Pj7X/d/fAAAE5klEQVR4nO2d63bqIBBGg+bmvWripdVj7fs/5LHt6mqFCQphYHR9+3+E3SYZ5ouGLHOgasumONZLxcvCZU4BqebjM7PaD28p/PJmH0nvk1F0v2oWUe+TQWTBMrLfhX8x/fIivqAa5vEEB3UCQaU+ogkmOEO/OUQS3KQSVGr77IJKvUYQXKcUVGrDLrhKK6hUySxYnVIbqjmv4Ti134UVp+A8td0XnJX/2DXobhic865rsD2fIl3qT9PRKg9P9dr5TzxUXIZD6g+65hrO0rwUTENSpZCx+ba1Z2OeIQ/mSJy3bmsD2nCM2JrjsHal9habI9Z4M0ZZM4zyy40QgSHWmOhjTMOP8ZdbMUnwE6gy7qShR9C4ZbgMHWsYlyHLxf6Hm1FX6Mpv1Aru2OR2mHcMO+BC+3j2SOGOuPKFdUD2dvueQDZorKE3Tuw5+12R8yzggHqxYO5EiZOG7L4DLhv1EJg9ZdcNN8SiSoWMNZIbLjoa8GAnkwDDjqAvVKwhwZBYG1/YtWEGFGFI32BPYZpwGYZ02hem8gsxNObxRZBYQ4ph9k4phujkxBjmZ0oxQKcjxjBrye+29F9FyjHseDzUO1MRZJiNSMW+M5Jk2JG+96z8ogyNfvyLul/sIMswI59qvPdSFGZohpuf9Kr80gzpyj/pMaA4w+qDUuwRH4kzzPLAsYY8w47K7x1rCDTMBqSi78wkGnYsbjxjDZGGdKxR+y1uZBrSscbRK9YQaphtKcV3nwGlGoaLNZIbdn4tkVT0iDWSG+4PLyQHcvnmUfmTG7riHGs8nKFzrPF4hq5TfEBDx29rPKChY82AYXBgCEMYGsAwODCEoXzD7t9bPIvhv9HcFT2XEm7ogZ6fwvAaGEoAhnZgKAEY2oGhBGBoB4YSgKEdGEoAhnZuGjK8OeIWkQ2nKjbGs3oYwvAaGEYAhjCEIQz5gSEMYQhDfmIbvi7ruCyN3zgxG1bxiWwoABjagaEEYGgHhhKAoR0YSgCGdmAoARjagaEEYGjnpuGgjI05BV7D+PuXGPsHIGuD4TUwjAAMYQhDGPIDQxjCEIb8xDZ8247jsjXeBIUe3w4MJQBDOzCUAAztwFACMLQDQwnA0A4MJQBDOzCUALPhppjEpTDeYY4kCobXwDACMIQhDGHIDwxhCEMY8hPb8Pm/QbsaxcbYIw89vh0YSgCGdmAoARjagaEEYGgHhhKAoR0YSgCGdp7fcKIdPWeaZR/m2hwnTkfrMYzzlskR0HclM4IcK/pWdsYL7wSgb0Y3czp6oR19YJplHw7aHN12H19rRyvjrfbJyfUpuu3M3eqHN0zz9KfRp9g6HV4N9eONFzMmptIneHacoV4uzFA9McZjBbdiYd6K3Teg58W4UTgXNONClLWu0dczzpdhZt6LlaSFjb6cUT71zDwNXCsOH3q19ryIzsTH7Nfpb6nVek/M7OzxSSXxOUqdpqNVm2AbnW/a1Wh6IudV+vyxjuRHXdgNU7HrmtLRR5C6nMXieROM/yTbF7fG6ZeKPuXlsfe+/61ST/1OjEf890MVRXn0Wk9uUs/+Dowv8T+bYu+FFl345eBV6q8Z1KklLNRBGp7c6IbFUISKj6SeqQHO0B8qPT+VwCxsn5M3VM+Sjn0TPt+s5mMpq7jTeM7Up1Zt2RTHeplMbVkfi6ZsnfT+A3kOiNNvozzFAAAAAElFTkSuQmCC";

const TaskInfoBlock = ({
  TaskName,
  TaskID,
  DueDate,
  Description,
  UserRole,
  ProjectId
}: TaskInfoBlockProps) => {
  const { projectId } = useApp();
  const [data, setData] = useState<any>([]);
  const [isDesEditing, setDesIsEditing] = useState(false);
  const [TNameIsEditing, setTNameIsEditing] = useState(false);
  const [inputTaskName, setinputTaskName] = useState("");
  const [inputTaskDesc, setinputTaskDesc] = useState("");
  const [inputDue, setinputDue] = useState("");
  const [InputTaskStatus, setInputTaskStatus] = useState("");
  const [value, setValue] = React.useState<Dayjs | null>(null);



  console.log(TaskID);

  const allcollaborators1 = queryCollaboratorsInTask(TaskID ? TaskID : "");
  console.log(allcollaborators1);

  const fetchData = async () => {
    const activeCollabs = await queryCollaboratorsInTask(TaskID ? TaskID : "");
    //const activeUserIds = activeCollabs.map((c) => c.userId);

    //@console.log(activeUserIds)
    await delay(2000);
    let users: any = [];
    await Promise.all(
      activeCollabs.map(async (c) => {
        const info = await getUser(c.userId!);
        users.push({ ...info });
      })
    );

    console.log("helpooooooo");
    console.log(users);
    setData(users);
  };




  /*
  
    const fetchData = async (id: string) => {
      const collaborators = await queryCollaboratorsInTask(id);
      const uids = collaborators.map((c) => c.userId);
      let list: any = [];
      //const list: Array<string> = [];
      await Promise.all(
        uids.map(async (a) => {
          const userInfo = await getUser(a);
          if (userInfo) {
            list.push(...userInfo);
          } else {
            list.push("");
          }
        })
      );
      setData(list);
  
  
    };
  
  
  */

  const [open, setOpen] = useState(false);
  const [CalOpen, setCalopen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [TaskID, open]);



  const check_time = async () => {
    await delay(2000)
    console.log('timetime')

  };




  return (
    <>
      <div className={`flex flex-col w-176 h-auto pt-5 pl-1`}>
        <div className={`flex flex-col w-176 h-auto`}>
          <div onClick={() => {
            setTNameIsEditing(true);
          }} className={`flex items-center text-2xl`}><TextInput
              placeholder="Click to Name the Task!..."
              disabled={TNameIsEditing ? false : true}
              fontSize='text-2xl'
              onChange={(val) => {
                setinputTaskName(val);
                updateTask(
                  TaskID,
                  val,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                )
              }}

              defaultValue={TaskName}
            /></div>
          <div className={`flex items-center text-gray-400 text-sm pt-2 px-2`}>
            TaskID: {TaskID}
          </div>
        </div>

        <div className={`flex flex-row w-176 h-auto pt-10 justify-between px-2`}>
          <div className={`flex flex-col w-auto h-auto pb-10 pr-auto`}>
            <div className={`flex items-start text-gray-400 text-xs`}>
              ASSIGNED TO
            </div>
            {
              <div
                className={`flex items-start text-sm text-gray-400 rounded-2xl pt-5`}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <AvatarGroup total={data.length < 5 ? data.length : 5}>
                  {data.map((item: any) => (
                    <Avatar
                      src={item.photo.downloadURL}
                      alt={item.displayName}
                    ></Avatar>
                  ))}
                </AvatarGroup>
              </div>
            }
          </div>

          <div className={`flex flex-col w-auto h-auto pb-10`}>
            <div className={`flex text-gray-400 text-xs`}>DUE DATE</div>
            <div
              className={`flex text-sm text-gray-400 bg-gray-50 rounded-2xl mt-8`}
              onClick={() => {
                setCalopen(true);
              }}

            >
              {DueDate}
            </div>
          </div>
        </div>
        <div className={`flex flex-col w-176 h-auto pt-5`}>
          <div className={`flex font-bold text-lg text-zinc-600 items-center gap-4`}>
            <DescriptionOutlinedIcon
              fontSize="large" />
            Description
          </div>
        </div>

        <div onClick={() => {
          setDesIsEditing(true);
        }}
          className={`flex item-start w-175 h-auto text-justify text-gray-500 rounded-2xl pt-3 pl-5`}
        >

          <TextInput_forDes
            placeholder="Click to Put some Description!..."
            disabled={isDesEditing ? false : true}
            onChange={(val) => {
              setinputTaskDesc(val);
              updateTask(
                TaskID,
                null,
                null,
                null,
                val,
                null,
                null,
                null,
              );
            }}

            defaultValue={Description}
          />
        </div>

        {
          <Popup
            open={open}
            onClose={() => {
              setOpen(false);
            }}

          >
            <TaskUserList taskId={TaskID} projectId={ProjectId} onComplete={() => { setOpen(false) }} />
          </Popup>


        }


        {

          <Popup
            open={CalOpen}
            onClose={() => {
              setCalopen(false);
            }}

          >

            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DatePicker
                label="Click to Change"
                value={DueDate}
                onChange={(newValue) => {
                  setValue(newValue);

                  check_time();
                  updateTask(
                    TaskID,
                    null,
                    null,
                    newValue?.toDate() ? newValue?.toDate() : null,
                    null,
                    null,
                    null,
                    null,
                  )
                }}
                renderInput={(params) => <TextField sx={{ backgroundColor: 'white', borderRadius: 5 }} {...params} />}
              />

            </LocalizationProvider>

          </Popup>



        }
      </div>
    </>
  );
};

export { TaskInfoBlock };

