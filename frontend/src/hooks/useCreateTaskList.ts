import { createTasklistService } from "@/services/taskServices";
import { type TaskListProtocol } from "@/types/TaskTypes";
import { isAxiosError } from "axios";
import { useState } from "react";

export default function useCreateTaskList(){
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [errors , setErrors] = useState<string>();
    const [isCreated , setIsCreated] = useState<boolean>(false);
    const [taskList , setTaskList] = useState<TaskListProtocol>()

    const createTaskList = async (accessToken : string , name : string)=>{
        setIsLoading(true)

        try{
            const response = (await createTasklistService(accessToken , name)).data
            setIsCreated(true)
            setTaskList(response)
        }catch(e){
            if(isAxiosError(e)){
                console.log(e.response?.data)
            }
        }finally{
            setIsLoading(false)
        }
    }

    return {isLoading , errors , setErrors , isCreated , taskList , createTaskList }
}
