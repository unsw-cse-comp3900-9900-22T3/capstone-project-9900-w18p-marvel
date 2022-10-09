import { getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { ProfileEntry } from "../components/ProfileEntry";
import { LogoutIcon } from "../icons/LogoutIcon";
import { PlusIcon } from "../icons/PlusIcon";

export const Navbar = () => {
  const { setUser } = useApp();
  const auth = getAuth(getApp());
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-end items-center gap-9 w-full h-24 p-6">
      <Button
        theme={"blue"}
        label={"Start Project"}
        size={"hug"}
        prefix={<PlusIcon className={""}></PlusIcon>}
      ></Button>
      <ProfileEntry
        onClickLogout={() => {
          signOut(auth)
            .then(() => {
              setUser?.(undefined);
              navigate("/login");
            })
            .catch(() => {
              alert("Logout Failed");
            });
        }}
      />
    </div>
  );
};
