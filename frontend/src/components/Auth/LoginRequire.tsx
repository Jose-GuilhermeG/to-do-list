import React from "react";
import { useNavigate } from "react-router-dom";

import LoginRequireVerify from "@/hooks/loginRequireVerify";
import Loading from "../ui/loading";

export default function LoginRequire({children} : {children : React.ReactElement}){
    const {isLoading , isLoged} = LoginRequireVerify()
    const navigate = useNavigate()

    if(isLoading) return (
        <div className="w-full h-full">
            <Loading/>
        </div>
    )

    if(!isLoged) navigate("/account/login/")

    return children
}