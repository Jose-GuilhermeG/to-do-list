import { useEffect, useState } from "react";
import type { TaskListProtocol } from "@/types/TaskTypes";
import { getTaskListsServices } from "@/services/taskServices";

export default function useGetTaskList(accessToken : string){
    const [isLoading , setIsLoading] = useState<boolean>(true);
    const [errors , setErrors] = useState<string>();
    const [taskLists , setTaskLists] = useState<TaskListProtocol[]>([])

    const getTaskLists = async (access : string)=>{
        setIsLoading(true)
        try{
            const response = (await getTaskListsServices(access)).data
            setTaskLists(response)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getTaskLists(accessToken)
    },[accessToken])

    return {isLoading , errors , setErrors , taskLists}

}