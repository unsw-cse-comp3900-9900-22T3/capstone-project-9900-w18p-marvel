import { useState } from "react";
import { answerConnection } from "../api/connection";
import { Invitation, User } from "../api/type";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

interface Props {
  invitaions: Array<Invitation>;
  userId:string
}

interface ItemProps {
  invitationId: string;
  userId: string;
  onConfirm: () => void;
  onDeny: () => void;
}

const NotificationItem = ({
  invitationId,
  userId,
  onConfirm,
  onDeny,
}: ItemProps) => {
  const [invitor, setInvitor] = useState<User>();

  return (
    <div className="bg-white-5 rounded-lg px-4 py-6 w-full flex gap-4">
      <Avatar size={"md"} rounded={"full"} src={invitor?.photo?.downloadURL} />
      <div className="flex flex-col gap-2 w-28">
        <div className="font-bold text-sm leading-5 text-black">
          {invitor?.displayName}
        </div>
        <div className="font-normal text-sm leading-5 text-gray-100">
          {invitor?.email}
        </div>
      </div>
      <Button
        theme={"blue"}
        size={"hug"}
        label={"Confirm"}
        onClick={onConfirm}
      />
      <Button theme={"gray"} size={"hug"} label={"Deny"} onClick={onDeny} />
    </div>
  );
};

export const Notification = ({ invitaions,userId }: Props) => {
  return (
    <div className="bg-white-100 rounded-3xl divide-y divide-white-5">
      <div className="flex justify-between p-6">
        <span className="text-sm font-bold text-black">Notifications</span>
        <div></div>
      </div>
      <div className="p-6 flex flex-col gap-2">
        {invitaions.map((iv) => (
          <NotificationItem
            invitationId={iv.id}
            userId={iv.inviteeId}
            onConfirm={()=>{
                answerConnection(iv.id,true,userId,new Date())
            }}
            onDeny={()=>{
                answerConnection(iv.id,false,userId,new Date())
            }}
          />
        ))}
      </div>
    </div>
  );
};
