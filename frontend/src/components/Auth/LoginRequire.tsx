import React from "react";
import { useNavigate } from "react-router-dom";

import LoginRequireVerify from "@/hooks/loginRequireVerify";

export default function LoginRequire({children} : {children : React.ReactElement}){
    const {isLoading , isLoged} =  {isLoading : false , isLoged : true} //LoginRequireVerify()
    const navigate = useNavigate()

    if(isLoading) return (
        <div>
            carregando
        </div>
    )

    if(!isLoged) navigate("account/login/")

    return children
}