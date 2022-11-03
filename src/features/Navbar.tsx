import { getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { ProfileEntry } from "../components/ProfileEntry";
import { LogoutIcon } from "../icons/LogoutIcon";
import { PlusIcon } from "../icons/PlusIcon";
import MailIcon from "@mui/icons-material/Mail";
import { Badge, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { getProject } from "../api/project";
import { ProjectIcon } from "../icons/ProjectIcon";

interface Props {
  onClickCreateProject: () => void;
  onClickNotification: () => void;
}

export const Navbar = ({
  onClickCreateProject,
  onClickNotification,
}: Props) => {
  const { setUser, user, setAuthorized, invitations, role, projectId } =
    useApp();
  const auth = getAuth(getApp());
  const [projectName, setProjectName] = useState<string>();

  const fetchProject = async (id: string) => {
    const proj = await getProject(id);
    setProjectName(proj?.title);
  };

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId]);

  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-between items-center gap-9 w-full h-24 p-6 shrink-0 grow-0">
      <div>
        {projectId && (
          <div className="flex gap-4 items-center">
            <ProjectIcon className={"text-gray-100"} />
            <p className="text-sm font-bold">{projectName}</p>
            <Chip
              color={
                role === "viewer"
                  ? "default"
                  : role === "editor"
                    ? "success"
                    : role === "owner" ? "info" : "error"
              }
              label={role || "unknown"}
              variant="outlined"
              size="small"
            />
          </div>
        )}
      </div>
      <div className="flex gap-9">
        <Button
          theme={"blue"}
          label={"Start Project"}
          size={"hug"}
          prefix={<PlusIcon className={""}></PlusIcon>}
          onClick={onClickCreateProject}
        ></Button>
        {invitations?.length > 0 && (
          <div
            className="transition-all w-fit h-fit relative animate-bounce hover:animate-none cursor-pointer"
            onClick={onClickNotification}
          >
            <Badge
              badgeContent={invitations?.length}
              color="primary"
              variant="dot"
            >
              <MailIcon color="action" />
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
    </div>
  );
};
