import { Folder } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { TaskListProtocol } from "@/types/TaskTypes"
import type React from "react";
import { useState } from "react";
import TaskListOptionsMenu from "./TaskListOptionMenu";

interface TaskListCardProtocol {
    taskList : TaskListProtocol ;
    isSelect : boolean 
    onClickEvent : (task : TaskListProtocol)=>void;
}

export default function TaskListCard({taskList , isSelect = false , onClickEvent} : TaskListCardProtocol){
    const [showMenu , setShowMenu] = useState<boolean>(false)
    const [y , setY] = useState<number>(0)
    const [x , setX] = useState<number>(0)
    const handlerRightClick = (e : React.MouseEvent) : void =>{
        e.preventDefault()
        setY(e.clientY - 100)
        setX(e.clientX - 150)
        setShowMenu((prev)=>!prev)
    }

    return (
        <li key={taskList.id} className="w-full hover:bg-neutral-200" onClick={()=>onClickEvent(taskList)} onContextMenu={handlerRightClick}>
            {showMenu && <TaskListOptionsMenu y={y} x={x} taskList={taskList} setOpen={setShowMenu}/>}
            <button className="w-4/5 m-auto flex px-2 py-4 cursor-pointer relative">
                <Folder className="mr-10"/> {taskList.name}
                {isSelect && 
                    <div className="w-2 h-2 bg-green-500 rounded-2xl absolute right-0 bottom-5" ></div>
                }
            </button>
            <Separator className="max-w-4/5 m-auto"/>
        </li>
    )
}