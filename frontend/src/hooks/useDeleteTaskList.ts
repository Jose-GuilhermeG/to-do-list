import { deleteTaskListService } from "@/services/taskServices"
import { useState } from "react"

export default function useDeleteTaskList(){
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [errors , setErrors] = useState<string | null>(null)
    const [isDelete , setIsDelete] = useState<boolean>(false)


    const deleteTaskItem = async (taskListId : number ) => {
        setIsLoading(true)
        try{
            await deleteTaskListService(taskListId)
            setIsDelete(true)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }

    return {isLoading , isDelete , errors , setErrors , deleteTaskItem}
}