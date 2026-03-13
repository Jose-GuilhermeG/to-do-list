import { deleteTaskItemService } from "@/services/taskServices"
import { useState } from "react"

export default function useDeleteTaskItem(){
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [errors , setErrors] = useState<string | null>(null)
    const [isDelete , setIsDelete] = useState<boolean>(false)


    const deleteTaskItem = async (taskId : number , taskListId : number ) => {
        setIsLoading(true)
        try{
            await deleteTaskItemService(taskId , taskListId )
            setIsDelete(true)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }

    return {isLoading , isDelete , errors , setErrors , deleteTaskItem}
}