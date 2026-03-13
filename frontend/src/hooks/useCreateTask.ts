import { createTaskItemService } from "@/services/taskServices";
import type { TaskItemProtocol, CreateTaskItemProtocol } from "@/types/TaskTypes";
import { useState } from "react";

export default function useCreateTask(){
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [isCreate , setIsCreate] = useState<boolean>(false);
    const [taskItem , setTaskItem] = useState<TaskItemProtocol>();
    const [errors , setErrors] = useState<string>()


    const createTask = async (data : CreateTaskItemProtocol , accessToken : string , taskListId : number) => {
        setIsLoading(true)
        try{
            const res = (await createTaskItemService(data , accessToken , taskListId)).data
            setTaskItem(res)
            setIsCreate(true)
            console.log(res)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }


    return {isLoading , errors , setErrors , isCreate , taskItem , createTask}

}