import type React from "react";
import { Alert, AlertAction, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon, XCircle } from "lucide-react"

export default function AuthContainer({children , errors , setErrors} : {children : React.ReactElement[], errors : string | undefined , setErrors : (value : string)=>void}){
    return (
        <main className="w-screen h-screen bg-neutral-100 flex justify-center items-center">
            {
                errors && 
                <Alert className="absolute! top-20 min-w-[20%] w-fit max-w-[30%]" variant="destructive">
                    <AlertCircleIcon/>
                    <AlertTitle>
                        {errors}
                    </AlertTitle>
                    <AlertAction>
                        <button className="cursor-pointer" onClick={()=>setErrors("")}>
                            <XCircle/>
                        </button>
                    </AlertAction>
                </Alert>
            }
            <section className="w-[75vw] h-[70vh] bg-white shadow-2xl shadow-neutral-300 rounded-xl grid grid-cols-2 relative max-lg:grid-cols-1">
                {children}
            </section>
        </main>
    )
}