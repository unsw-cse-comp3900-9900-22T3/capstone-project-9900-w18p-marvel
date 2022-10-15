import { useState } from "react";
import { useApp } from "../App";
import { CreateProject } from "../components/CreateProject";
import { Popup } from "../components/Popup";
import { Navbar } from "../features/Navbar";
import { Sidebar } from "../features/Sidebar";

interface HomeProps {
  children: JSX.Element;
}

export const Home = ({ children }: HomeProps) => {
  const {user} = useApp()
  const [collapse, setCollpase] = useState<boolean>(false);
  const [projectPopupOpen, setProjectPopupOpen] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-row w-full h-full">
        <Sidebar></Sidebar>
        <div className="flex flex-col w-full">
          <Navbar
            onClickCreateProject={() => {
              setProjectPopupOpen(true);
            }}
          />
          <div className="w-full h-full bg-white-5 rounded-l-2xl">
            {children}
          </div>
        </div>
      </div>
      <Popup open={projectPopupOpen} onClose={()=>{setProjectPopupOpen(false)}}>
        <CreateProject
          createdBy={user?.displayName || "John Doe"}
          onComplete={() => {
            setProjectPopupOpen(false)
          }}
        />
      </Popup>
    </>
  );
};
