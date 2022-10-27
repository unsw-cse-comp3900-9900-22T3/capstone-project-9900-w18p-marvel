import { useEffect, useState } from "react";
import { useApp } from "../App";
import { CreateProject } from "../components/CreateProject";
import { Popup } from "../components/Popup";
import { Navbar } from "../features/Navbar";
import { Sidebar } from "../features/Sidebar";
import { UserList } from "../components/UserList";
import { ProjectUserList } from "../components/ProjectUserList";
import { requestConnection } from "../api/user";
import { Notification } from "../components/Notification";

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
  useEffect(() => {
    console.log("xxxyyy", projectId);
  }, [projectId]);
  return (
    <>
      <div className="flex flex-row w-full h-full">
        <Sidebar
          onClickManageMember={() => {
            if (projectId !== "") {
              setMemberPopupOpen(true);
            }
          }}
        ></Sidebar>
        <div className="flex flex-col w-full">
          <Navbar
            onClickCreateProject={() => {
              setProjectPopupOpen(true);
            }}
            onClickNotification={() => {
              setNotificationPopupOpen(true);
            }}
          />
          <div className="w-full h-full bg-white-5 rounded-l-2xl relative overflow-hidden">
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
        open={notificationPopupOpen}
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
          onConfirm={(collaborators: Array<string>) => {
            if (user?.uid) {
              collaborators.map((c) => {
                requestConnection(c, user.uid!, new Date());
              });
            }
          }}
        />
      </Popup>
    </>
  );
};
