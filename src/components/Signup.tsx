import { useState } from "react";
import { Google } from "../icons/Google";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";

interface Props {
    onClickCreate: (email: string, password: string,username:string) => void;
    onClickGoogle: () => void;
    onSwitchMode: () => void;
  }

export const Signup = ({
  onClickCreate,
  onClickGoogle,
  onSwitchMode,
}: Props) => {
    const [email,setEmail] = useState<string>('')
    const [username,setUsername] = useState<string>('')
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
            type={"text"}
            placeholder={"Your Name"}
            onChange={(val: string) => {
              setUsername(val);
            }}
          ></Input>
          <Input
            type={"password"}
            placeholder={"Create Password"}
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
            <div className="shrink text-sm font-bold">
              <span className="text-white-10">
                By creating an account, you agree to our
              </span>
              <span className="text-blue-100"> Term and Conditions</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 items-center">
          <Button
            theme={"blue"}
            label={"Create"}
            onClick={() => {
              if (
                email.length > 0 &&
                password.length > 0 &&
                username.length > 0
              ) {
                onClickCreate(email, password, username);
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
              Already have an account?
            </span>
            <a
              className="cursor-pointer font-bold text-sm text-blue-100"
              onClick={onSwitchMode}
            >
              {" Sign in"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
