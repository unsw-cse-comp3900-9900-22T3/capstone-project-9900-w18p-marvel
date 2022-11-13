import { Button } from "./Button"
import { Popup } from "./Popup"
import { async } from "@firebase/util";
import { useState } from "react";
import React from "react";
import { scoreTask } from "../api/task";

export const Grade = ()=>{
    const [Value, setValue] = React.useState("")

    return (
        <div className="flex flex-col w-72">
            <div className="text-right text-4xl mr-1 mt-1">×</div>
            <div className="text-3xl w-72 text-center h-12 text-gray-500">Grade</div>
            <div className="w-72 bg-neutral-400 h-px"></div>
            <div className="flex flex-row w-72 justify-between h-12 mt-4">
                <div className="ml-7 leading-10 text-2xl text-blue-700">perfect</div>
                <div className="mr-7 mt-4">
                    <input type='radio' name="grade" onChange={(event) => setValue(event.target.value)} value="perfect" />
                </div>
            </div>
            <div className="flex flex-row w-72 justify-between h-12">
                <div className="ml-7 leading-10 text-2xl text-blue-700">great</div>
                <div className="mr-7 mt-4">
                    <input type="radio" name="grade" onChange={(event) => setValue(event.target.value)} value="great" />
                </div>
            </div>
            <div className="flex flex-row w-72 justify-between h-12">
                <div className="ml-7 leading-10 text-2xl text-blue-700">good</div>
                <div className="mr-7 mt-4">
                    <input type="radio" name="grade" onChange={(event) => setValue(event.target.value)} value="good" />
                </div>
            </div>
            <div className="flex flex-row w-72 justify-between h-12 mb-4">
                <div className="ml-7 leading-10 text-2xl text-blue-700">ok</div>
                <div className="mr-7 mt-4">
                    <input type="radio" name="grade" onChange={(event) => setValue(event.target.value)} value="ok" />
                </div>
            </div>
            <div className="w-72 bg-neutral-600 h-px"></div>
            <div>
                <div className="w-36 ml-16 mt-4 h-7">
                    <Button 
                        theme={"blue"} 
                        size={"fill"} 
                        label={"Confirm"}
                        onClick={async () => {
                            {scoreTask(id, Value)}
                        }}
                    ></Button></div>
            </div>
        </div>
    )
}