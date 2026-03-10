import React, { useState } from "react"

import type { TaskItemProtocol } from "@/types/TaskTypes"
import { Field , FieldDescription } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"


export default function TaskItemCard({task , onClickEvent} : {task : TaskItemProtocol , onClickEvent : (task : TaskItemProtocol) =>void }){
    const [checked , setChecked] = useState<boolean>(task.status == "completed")

    const MarkTask = () : void => setChecked(prevs => !prevs)

    return (
        <Field key={task.id} className="w-full my-2 shadow shadow-neutral-200 hover:bg-neutral-200 group cursor-pointer rounded-[5px]" 
            onDoubleClick={()=>MarkTask()}
            onClick={()=>onClickEvent(task)}
            >
            <h1 className="flex px-2 py-3 cursor-pointer text-2xl items-center">
                <Checkbox className="mx-2 group-hover:border-black" checked={checked} onClick={(e)=>e.stopPropagation()} onCheckedChange={()=>setChecked(prev=>!prev)} />  {task.title}
            </h1>
            <FieldDescription className="px-5 font-light">
                {task.description}
            </FieldDescription>
            <Separator className="m-auto"/>
        </Field>
    )
}