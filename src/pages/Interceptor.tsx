import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";


type Props = {
    children: JSX.Element
  }
  
  export const Interceptor = ({children }: Props) => {
    const navigate = useNavigate();
    const { authorized } = useApp();
    useEffect(()=>{
        if(!authorized){
            navigate("/login")
        }
    },[])

    return <div className="w-full h-full">{authorized === true && children}</div>;
  }
  