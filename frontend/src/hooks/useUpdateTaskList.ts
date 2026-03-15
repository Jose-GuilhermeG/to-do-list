import { updateTaskListService } from "@/services/taskServices";
import type { TaskListProtocol } from "@/types/TaskTypes";
import { useState } from "react";

export default function useUpdateListTask(){
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [isUpdated , setIsUpdated] = useState<boolean>(false);
    const [taskList , setTaskList] = useState<TaskListProtocol>();
    const [errors , setErrors] = useState<string>()


    const updateTask = async (taskListName : string , taskListId : number ) => {
        setIsLoading(true)
        try{
            const res = (await updateTaskListService(taskListName , taskListId)).data
            setTaskList(res)
            setIsUpdated(true)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }


    return {isLoading , errors , setErrors , isUpdated , taskList , updateTask}

}