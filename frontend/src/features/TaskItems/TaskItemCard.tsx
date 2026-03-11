import { useContext, useState } from "react"

import type { TaskItemProtocol } from "@/types/TaskTypes"
import { Field , FieldDescription } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext"
import useSetStatus from "@/hooks/useSetStatus"
import Loading from "@/components/ui/loading"


export default function TaskItemCard({task , taskListId , onClickEvent} : {task : TaskItemProtocol , taskListId : number , onClickEvent : (task : TaskItemProtocol) =>void }){
    const [checked , setChecked] = useState<boolean>(task.status == "completed")
    const {accessToken} = useContext(AuthContext) as AuthContextProtocol
    const {isLoading , setStatus} = useSetStatus()

    const MarkTask = async () =>{
        setChecked(prevs=>!prevs)
        setStatus(accessToken , task.id , taskListId ,!checked ? "completed" : "pending")
    } 

    if(isLoading) return (
        <Field className="flex items-center py-10">
            <Loading/>
        </Field>
    )

    return (
        <Field key={task.id} className="w-full my-2 shadow shadow-neutral-200 hover:bg-neutral-200 group cursor-pointer rounded-[5px]" 
            onDoubleClick={(e)=>{
                e.stopPropagation()
                MarkTask()
            }}
            onClick={()=>onClickEvent(task)}
            >
            <h1 className="flex px-2 py-3 cursor-pointer text-2xl items-center">
                <Checkbox className="mx-2 group-hover:border-black" checked={checked} onClick={(e)=>e.stopPropagation()} onCheckedChange={MarkTask} />  {task.title}
            </h1>
            <FieldDescription className="px-5 font-light">
                {task.description}
            </FieldDescription>
            <Separator className="m-auto"/>
        </Field>
    )
}