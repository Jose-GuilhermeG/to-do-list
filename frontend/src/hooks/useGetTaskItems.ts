import { useEffect, useState } from "react";
import type { TaskItemListProtocol } from "@/types/TaskTypes";
import { getTaskItemsService } from "@/services/taskServices";

export default function useGetTaskItems(accessToken : string , taskLisId : number){
    const [isLoading , setIsLoading] = useState<boolean>(true);
    const [errors , setErrors] = useState<string>();
    const [taskItems , setTaskItems] = useState<TaskItemListProtocol[]>([]);

    const getTaskItems = async (access : string)=>{
        setIsLoading(true)
        try{
            const response = (await getTaskItemsService(access , taskLisId)).data
            setTaskItems(response)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getTaskItems(accessToken)
    },[accessToken , taskLisId])

    return {isLoading , errors , setErrors , taskItems , refetch: getTaskItems }

}