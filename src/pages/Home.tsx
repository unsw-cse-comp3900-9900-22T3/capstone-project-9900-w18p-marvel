import { useEffect, useState } from "react";
import { useApp } from "../App";
import { CreateProject } from "../components/CreateProject";
import { Popup } from "../components/Popup";
import { Navbar } from "../features/Navbar";
import { Sidebar } from "../features/Sidebar";
import { UserList } from "../components/UserList";
import { ProjectUserList } from "../components/ProjectUserList";
import { Notification } from "../components/Notification";
import { requestConnection } from "../api/connection";

interface HomeProps {
  children: JSX.Element;
}

export const Home = ({ children }: HomeProps) => {
  const { user, projectId, invitations } = useApp();
  const [collapse, setCollpase] = useState<boolean>(false);
  const [projectPopupOpen, setProjectPopupOpen] = useState<boolean>(false);
  const [memberPopupOpen, setMemberPopupOpen] = useState<boolean>(false);
  const [notificationPopupOpen, setNotificationPopupOpen] =
    useState<boolean>(false);
  useEffect(() => {}, [projectId]);
  return (
    <>
      <div className="flex flex-row w-full h-full justify-between overflow-hidden">
        <Sidebar
          onClickManageMember={() => {
            if (projectId !== "") {
              setMemberPopupOpen(true);
            }
          }}
        ></Sidebar>
        <div className="flex flex-col w-full h-full shrink-1 grow-0 overflow-hidden">
          <Navbar
            onClickCreateProject={() => {
              setProjectPopupOpen(true);
            }}
            onClickNotification={() => {
              setNotificationPopupOpen(true);
            }}
          />
          <div className=" h-full bg-white-5 rounded-l-2xl relative overflow-hidden shrink-1">
            {children}
          </div>
        </div>
      </div>
      <Popup
        open={projectPopupOpen}
        onClose={() => {
          setProjectPopupOpen(false);
        }}
      >
        <CreateProject
          createdBy={user?.displayName || "John Doe"}
          onComplete={() => {
            setProjectPopupOpen(false);
          }}
        />
      </Popup>
      <Popup
        open={notificationPopupOpen && invitations.length > 0}
        onClose={() => {
          setNotificationPopupOpen(false);
        }}
      >
        <Notification invitaions={invitations} userId={user?.uid || ""} />
      </Popup>
      <Popup
        open={memberPopupOpen}
        onClose={() => {
          setMemberPopupOpen(false);
        }}
      >
        <ProjectUserList
          projectId={projectId}
        />
      </Popup>
    </>
  );
};
