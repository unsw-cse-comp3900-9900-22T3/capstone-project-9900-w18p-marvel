import { Avatar, AvatarGroup } from "@mui/material";
import { useState } from "react";
import { uid } from "uid";
import { User } from "../api/type";
import { getUser } from "../api/user";
import { Button } from "./Button";
import TDataRangePicker from "./DataRangePicker";
import { FilterUserList } from "./FilterUserList";
import { Input } from "./Input";
import { Popup } from "./Popup";
import { SearchBox } from "./SearchBox";
import { TaskUserList } from "./TaskUserList";
import TSelect from "./TSelect";

interface Props {
  projectId: string | null;
  onCancel:()=>void
  onConfirm:({userIds,title,description,startDate,endDate}:any)=>void
}

export const TaskFilter = ({ projectId,onConfirm,onCancel }: Props) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [avatars, setAvatars] = useState<Array<string>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date|null>(null);
  const [endDate, setEndDate] = useState<Date|null>(null);

  const onCollaboratorSelected = async (selected: Array<string>) => {
    setSelected(selected)
    let users: any = [];
    await Promise.all(
      selected.map(async (c) => {
        const info = await getUser(c);
        users.push({ ...info });
      })
    );
    setAvatars(users.map((u: User) => u.photo?.downloadURL));
  };
  return (
    <>
      <div className="w-[432px] my-[200px] bg-white-100 rounded-3xl">
        <div className="divide-y divide-solid divide-gray-20 w-full h-full py-6 px-4">
          {/* <div className="w-full px-4 py-3">
          <Input type={"search"} />
        </div> */}
          <div className="flex flex-col gap-4 w-full p-4">
            <div className="w-full">
              <p className="mb-4 font-bold text-xs text-gray-100">
                COLLABORATORS
              </p>
              <div
                className="w-full h-12 rounded-2xl bg-white-5 cursor-pointer px-4 flex items-center"
                onClick={() => {
                  setOpen(true);
                }}
              >
                {avatars?.length > 0 && (
                  <AvatarGroup sx={{ height: 24 }} max={10}>
                    {avatars?.map((c) => (
                      <Avatar
                        key={uid(4)}
                        sx={{ width: 24, height: 24 }}
                        src={c}
                      />
                    ))}
                  </AvatarGroup>
                )}
                {avatars?.length === 0 && (
                  <span className="text-gray-100 text-sm font-normal">
                    Please select collaborators to filter
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <p className="mb-4 font-bold text-xs text-gray-100">TITLE</p>
              <Input type={"text"} onChange={(val) => setTitle(val)} />
            </div>
            <div className="w-full">
              <p className="mb-4 font-bold text-xs text-gray-100">
                DESCRIPTION
              </p>
              <Input type={"text"} onChange={(val) => setDescription(val)} />
            </div>
            <TDataRangePicker
              onConfirm={(val: any) => {
                setStartDate(val[0]?.toDate());
                setEndDate(val[1]?.toDate());
              }}
            />
          </div>
          <div className="flex justify-between p-4 gap-6">
            <Button theme={"gray"} size={"fill"} label={"Cancel"} onClick={onCancel}/>
            <Button theme={"blue"} size={"fill"} label={"Search"} onClick={()=>{
              onConfirm?.({userIds:selected,title,description,startDate,endDate})
            }}/>
          </div>
        </div>
      </div>
      <Popup
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <FilterUserList
          projectId={projectId}
          onConfirm={(users) => {
            onCollaboratorSelected(users);
            setOpen(false);
          }}
        />
      </Popup>
    </>
  );
};
