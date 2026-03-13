import { updateTaskItemService } from "@/services/taskServices";
import type { TaskItemProtocol, CreateTaskItemProtocol } from "@/types/TaskTypes";
import { useState } from "react";

export default function useUpdateTask(){
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [isUpdated , setIsUpdated] = useState<boolean>(false);
    const [taskItem , setTaskItem] = useState<TaskItemProtocol>();
    const [errors , setErrors] = useState<string>()


    const updateTask = async (data : CreateTaskItemProtocol , accessToken : string , taskListId : number , taskItemId : number) => {
        setIsLoading(true)
        try{
            const res = (await updateTaskItemService(data , accessToken , taskListId , taskItemId)).data
            setTaskItem(res)
            setIsUpdated(true)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }


    return {isLoading , errors , setErrors , isUpdated , taskItem , updateTask}

}