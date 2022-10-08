import React from "react"
import { useState } from "react"
import { Google } from "../icons/Google"
import { Button } from "./Button"
import { Checkbox } from "./Checkbox"
import { Input } from "./Input"

interface Props {
  onClickLogin: (email: string, password: string) => void;
  onClickGoogle: () => void;
  onSwitchMode: () => void;
}

export const Signin = ({onClickLogin,onClickGoogle,onSwitchMode}:Props)=>{
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    return (
      <div className="flex flex-col gap-10 w-96 h-fit px-8 py-10 bg-white-100 rounded-[48px]">
        <div className="w-full flex flex-col gap-3 items-center">
          <div className="font-bold text-lg">Let's Sign You In</div>
          <div className="text-sm text-gray-100">
            Welcome back,you've been missed!
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="w-full flex flex-col gap-6 items-center">
            <Input
              type={"text"}
              placeholder={"Your Email"}
              onChange={(val: string) => {
                setEmail(val);
              }}
            ></Input>
            <Input
              type={"password"}
              placeholder={"Your Password"}
              onChange={(val: string) => {
                setPassword(val);
              }}
            ></Input>
          </div>
          <div className="w-full flex flex-row gap-14 justify-between items-center">
            <div className="flex flex-row gap-2 items-baseline">
              <div className="grow">
                <Checkbox defaultValue={false} />
              </div>
              <div className="text-sm font-bold">Remeber Me</div>
            </div>
            <div className="shrink cursor-pointer text-blue-100 font-bold text-sm">
              Forgot Password?
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 items-center">
            <Button
              theme={"blue"}
              label={"Login"}
              onClick={() => {
                if (email.length > 0 && password.length > 0) {
                  onClickLogin(email, password);
                }
              }}
              size={"fill"}
            ></Button>
            <div className="text-gray-100 font-bold text-sm">OR</div>
            <Button
              theme={"gray"}
              label={"Gontinue with Google"}
              prefix={<Google className="" />}
              onClick={() => {
                onClickGoogle();
              }}
              size={"fill"}
            ></Button>
            <div className="">
              <span className="font-medium text-sm text-gray-100">
                Don't have an account?
              </span>
              <a
                className="cursor-pointer font-bold text-sm text-blue-100"
                onClick={onSwitchMode}
              >
                {" Sign up"}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}