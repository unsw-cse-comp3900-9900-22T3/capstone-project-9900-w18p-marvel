import { getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { ProfileEntry } from "../components/ProfileEntry";
import { LogoutIcon } from "../icons/LogoutIcon";
import { PlusIcon } from "../icons/PlusIcon";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";

interface Props {
  onClickCreateProject: () => void;
  onClickNotification:()=>void;
}

export const Navbar = ({ onClickCreateProject,onClickNotification }: Props) => {
  const { setUser, user, setAuthorized, invitations } = useApp();
  const auth = getAuth(getApp());
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-end items-center gap-9 w-full h-24 p-6 shrink-0 grow-0">
      <Button
        theme={"blue"}
        label={"Start Project"}
        size={"hug"}
        prefix={<PlusIcon className={""}></PlusIcon>}
        onClick={onClickCreateProject}
      ></Button>
      {invitations?.length > 0 && (
        <div className="transition-all w-fit h-fit relative animate-bounce hover:animate-none cursor-pointer" onClick={onClickNotification}>
          <Badge badgeContent={invitations?.length} color="primary">
            <NotificationsIcon color="action" />
          </Badge>
        </div>
      )}
      <ProfileEntry
        onClickLogout={() => {
          signOut(auth)
            .then(() => {
              setUser?.(undefined);
              setAuthorized?.(false);
              navigate("/login");
            })
            .catch(() => {
              alert("Logout Failed");
            });
        }}
        onClickProfile={() => {
          navigate("/profile");
        }}
        photoURL={user?.photo?.downloadURL || ""}
      />
    </div>
  );
};
