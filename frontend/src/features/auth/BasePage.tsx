import type React from "react";
import AuthContainer from "./AuthContainer";
import { Separator } from "@/components/ui/separator";

export default function BaseAuthPage({children , errors , setErrors} : {children : React.ReactElement, errors : string | undefined , setErrors : (value : string)=>void}){
    return (
        <AuthContainer errors={errors} setErrors={setErrors}>
            <div className="aspect-square w-full h-4/5 m-auto flex flex-col justify-around items-center max-lg:hidden">
                <h1 className="text-4xl font-bold tracking-[2px] font-serif">
                    TaskList
                </h1>
                <img src="/anotated.png" alt="" className="aspect-square max-w-[400px]" />
            </div>
            <Separator orientation="vertical" className="absolute left-[47%] h-9/10 top-[5%] max-lg:hidden" />
            {children}
        </AuthContainer>
    )
}