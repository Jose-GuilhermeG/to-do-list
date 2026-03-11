import { setTaskItemStatusService } from "@/services/taskServices";
import type { TaskItemProtocol } from "@/types/TaskTypes";
import { useState } from "react";

export default function useSetStatus(){
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [isSeting , setIsSeting] = useState<boolean>(false)
    const [errors , setErrors] = useState<string>()

    const setStatus = async (accessToken : string , taskId : number , listId : number , status : TaskItemProtocol["status"]) =>{
        setIsLoading(true)
        try{
            await setTaskItemStatusService(
                taskId , listId , status , accessToken
            )
            setIsSeting(true)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }

    return {isLoading , errors ,setErrors , setStatus , isSeting}

}