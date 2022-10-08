import { useState } from "react";
import { Navbar } from "../components/Navbar";

interface HomeProps {
  children: JSX.Element;
}

export const Home = ({ children }: HomeProps) => {
  const [collapse, setCollpase] = useState<boolean>(false);
  return (
    <div className="flex flex-row w-full h-full">
      <div
        className={`transition-all overflow-hidden flex flex-col ${
          collapse ? "w-14" : "w-60"
        } bg-yellow-300 h-full p-4`}
      >
        <div className="flex justify-end w-full">
          <div
            className="cursor-pointer w-6 h-6 bg-blue-100 flex justify-center items-center text-white"
            onClick={() => {
              setCollpase(!collapse);
            }}
          >
            &#x2190;
          </div>
        </div>
        <div>Project</div>
        <div>Task</div>
      </div>
      <div className="flex flex-col w-full">
        <Navbar></Navbar>
        <div className="w-full h-full bg-purple-500">{children}</div>
      </div>
    </div>
  );
};
