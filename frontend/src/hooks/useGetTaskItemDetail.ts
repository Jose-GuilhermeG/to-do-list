import { getTaskItemDetailService } from "@/services/taskServices";
import type { TaskItemProtocol } from "@/types/TaskTypes";
import { useEffect, useState } from "react";

export default function useGetTaskItemDetail(accessToken : string , taskListId : number , taskItemId : number ){
    const [isLoading , setIsLoading] = useState<boolean>(true);
    const [errors , setErrors] = useState<string>();
    const [taskItem , setTaskItem] = useState<TaskItemProtocol>();

    const getTaskItemDetail = async (access : string , taskListId : number , taskItemId : number)=>{
        setIsLoading(true)
        try{
            const response = (await getTaskItemDetailService(access , taskListId , taskItemId)).data
            setTaskItem(response)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getTaskItemDetail(accessToken , taskListId , taskItemId)
    },[accessToken , taskItemId , taskListId])

    return {isLoading , errors , setErrors , taskItem , setTaskItem}
}