import { useEffect, useState } from "react";
import { answerConnection } from "../api/connection";
import { getProject } from "../api/project";
import { Invitation, Project, User } from "../api/type";
import { getUser } from "../api/user";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

interface Props {
  invitaions: Array<Invitation>;
  userId: string;
}

interface ItemProps {
  invitationId: string;
  invtorId: string;
  projectId: string;
  onConfirm: () => void;
  onDeny: () => void;
}

const NotificationItem = ({
  invitationId,
  invtorId,
  projectId,
  onConfirm,
  onDeny,
}: ItemProps) => {
  const [invitor, setInvitor] = useState<User>();
  const [project, setProject] = useState<Project>();

  const fetch = async (invitorId: string) => {
    const _invitor = await getUser(invitorId);
    if (_invitor) setInvitor(_invitor);
    const _proj = await getProject(projectId);
    if (_proj) setProject(_proj);
  };

  useEffect(() => {
    fetch(invtorId);
  }, []);

  return (
    <div className="bg-white-5 rounded-2xl px-4 py-6 w-full flex gap-4">
      <Avatar size={"md"} rounded={"full"} src={invitor?.photo?.downloadURL} />
      <div className="flex flex-col gap-2 w-fit">
        <div className="font-bold text-sm leading-5 text-black">
          {invitor?.displayName}
        </div>
        <p className="font-normal text-sm leading-5 text-gray-300">
          {`Invite you to project`}
        </p>
        <p className="font-normal text-sm leading-5 text-gray-100">
          {project?.title}
        </p>
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

export const Notification = ({ invitaions, userId }: Props) => {
  console.log(invitaions);
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
            invtorId={iv.createdBy}
            projectId={iv.projectId}
            onConfirm={() => {
              answerConnection(iv.id, true, userId, new Date());
            }}
            onDeny={() => {
              answerConnection(iv.id, false, userId, new Date());
            }}
          />
        ))}
      </div>
    </div>
  );
};
