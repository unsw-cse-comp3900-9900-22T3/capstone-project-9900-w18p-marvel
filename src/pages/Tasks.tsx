import { createTask } from "../api/task";
import { Button } from "../components/Button"
import { uid } from 'uid'
import { faker } from '@faker-js/faker';
import { useApp } from "../App";
import { useState } from "react";
import { Lane } from "../components/Lane";

interface Props {}

export const Tasks = ({}: Props) => {
  const {user} = useApp()
  const [data,setData]=useState(["Todo","On Going"])
  return (
    <div className="w-full h-full flex flex-row gap-6">
      {data.map((item: any) => (
        <Lane name={item} />
      ))}
    </div>
  );
};
