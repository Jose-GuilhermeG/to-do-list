import { useContext, useEffect, useState } from "react"

import type { TaskItemProtocol } from "@/types/TaskTypes"
import { Field , FieldDescription } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext"
import useSetStatus from "@/hooks/useSetStatus"
import Loading from "@/components/ui/loading"
import {Trash2} from "lucide-react"
import useDeleteTaskItem from "@/hooks/useDeleteTaskItem"
import { TaskContext, type TaskContextProtocol } from "@/contexts/taskContext"


export default function TaskItemCard({task , taskListId , onClickEvent} : {task : TaskItemProtocol , taskListId : number , onClickEvent : (task : TaskItemProtocol) =>void }){
    const [checked , setChecked] = useState<boolean>(task.status == "completed")
    const {accessToken} = useContext(AuthContext) as AuthContextProtocol
    const {isLoading , setStatus} = useSetStatus()
    const {deleteTaskItem , isDelete , isLoading : isDeleteLoading} = useDeleteTaskItem()
    const {setTasks , tasks , selectTask , setSelectTaskItemInfo} = useContext(TaskContext) as TaskContextProtocol
    const taskId = task.id

    useEffect(()=>{
        if(isDelete){
            setTasks(tasks.filter(element=>element.id != task.id))
            if(selectTask?.id == taskId) setSelectTaskItemInfo(undefined)
        }
    },[isDelete])

    const MarkTask = async () =>{
        setChecked(prevs=>!prevs)
        setStatus(accessToken , task.id , taskListId ,!checked ? "completed" : "pending")
    } 

    if(isLoading || isDeleteLoading) return (
        <Field className="flex items-center py-10">
            <Loading/>
        </Field>
    )

    const deleteFunc = async () => {
        await deleteTaskItem(task.id , taskListId)
    }

    return (
        <Field key={task.id} className="w-full my-2 shadow shadow-neutral-200 hover:bg-neutral-200 group cursor-pointer rounded-[5px]" 
            onDoubleClick={(e)=>{
                e.stopPropagation()
                MarkTask()
            }}
            onClick={()=>onClickEvent(task)}
            >
            <h1 className="flex px-2 py-3 cursor-pointer text-2xl items-center relative">
                <Checkbox className="mx-2 group-hover:border-black" checked={checked} onClick={(e)=>e.stopPropagation()} onCheckedChange={MarkTask} />  {task.title}
                <div className="h-1/2 aspect-square px-1 py-4 rounded-[5px] absolute right-5 bottom-[15%] flex justify-center items-center bg-red-600 group-hover:bg-red-700 hover:bg-red-500" onDoubleClick={(e)=>e.stopPropagation()} onClick={deleteFunc}>
                    <Trash2 className="text-white"/>
                </div>
            </h1>
            <FieldDescription className="px-5 font-light">
                {task.description}
            </FieldDescription>
            <Separator className="m-auto"/>
        </Field>
    )
}