import { useState } from "react";
import { Navbar } from "../features/Navbar";
import { Sidebar } from "../features/Sidebar";

interface HomeProps {
  children: JSX.Element;
}

export const Home = ({ children }: HomeProps) => {
  const [collapse, setCollpase] = useState<boolean>(false);
  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar></Sidebar>
      <div className="flex flex-col w-full">
        <Navbar></Navbar>
        <div className="w-full h-full bg-white-5 rounded-l-2xl">{children}</div>
      </div>
    </div>
  );
};
