import { Button } from "./Button"
import { Popup } from "./Popup"
import { async } from "@firebase/util";
import { useState } from "react";
import React from "react";
import { scoreTask } from "../api/task";



interface GradeProp {
    id: string;
    onComplete?: () => void;


}

export const Grade = ({ id, onComplete }: GradeProp) => {
    const [Value, setValue] = React.useState("")

    return (
        <div className="flex flex-col w-72 bg-white-100 rounded-[32px]" >
            <div className="text-3xl w-72 text-center h-12 text-gray-500 pt-5">Grade it!</div>

            <div className="flex flex-row w-72 justify-between h-12 mt-4">
                <div className="ml-7 leading-10 text-2xl text-blue-700">Perfect</div>
                <div className="mr-7 mt-4">
                    <input type='radio' name="grade" onChange={(event) => setValue(event.target.value)} value="perfect" />
                </div>
            </div>
            <div className="flex flex-row w-72 justify-between h-12">
                <div className="ml-7 leading-10 text-2xl text-blue-700">Great</div>
                <div className="mr-7 mt-4">
                    <input type="radio" name="grade" onChange={(event) => setValue(event.target.value)} value="great" />
                </div>
            </div>
            <div className="flex flex-row w-72 justify-between h-12">
                <div className="ml-7 leading-10 text-2xl text-blue-700">Good</div>
                <div className="mr-7 mt-4">
                    <input type="radio" name="grade" onChange={(event) => setValue(event.target.value)} value="good" />
                </div>
            </div>
            <div className="flex flex-row w-72 justify-between h-12 mb-4">
                <div className="ml-7 leading-10 text-2xl text-blue-700">Okay</div>
                <div className="mr-7 mt-4">
                    <input type="radio" name="grade" onChange={(event) => setValue(event.target.value)} value="ok" />
                </div>
            </div>

            <div>
                <div className="w-36 ml-16 mb-10 h-7">
                    <Button
                        theme={"blue"}
                        size={"fill"}
                        label={"Confirm"}
                        onClick={async () => {
                            { scoreTask(id, Value) }
                            onComplete?.();
                        }}
                    ></Button></div>
            </div>
        </div >
    );
};
