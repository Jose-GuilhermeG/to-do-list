import { Trash2 , Edit } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import EditTaskList from "./EditTaskList";
import type { TaskListProtocol } from "@/types/TaskTypes";
import useDeleteTaskList from "@/hooks/useDeleteTaskList";
import { BaseModal, Modal, ModalContent } from "@/components/ui/modal";
import Loading from "@/components/ui/loading";
import { TaskContext, type TaskContextProtocol } from "@/contexts/taskContext";

interface TaskListOptionsMenuProtocol{
    y : number;
    x :number;
    taskList : TaskListProtocol;
    setOpen : (value : boolean) => void
}

export default function TaskListOptionsMenu({y , x , taskList , setOpen} : TaskListOptionsMenuProtocol){
    const [isEditing , setIsEditing] = useState<boolean>(false)
    const buttonRef = useRef<HTMLDivElement>(null)
    const elementClasses = `taskListModal:${taskList.id}`
    const showMenu = (e : MouseEvent) : void => {if(!(e.target == buttonRef.current || ((e.target as HTMLElement).parentNode as HTMLElement)?.classList.contains(elementClasses))) setOpen(false)}
    const {isDelete , isLoading , deleteTaskItem} = useDeleteTaskList()
    const {setTaskLists , taskLists} = useContext(TaskContext) as TaskContextProtocol

    useEffect(()=>{
        if(isDelete) setTaskLists(taskLists.filter(element=>element.id != taskList.id))
        
        document.addEventListener("click",showMenu)
        return ()=>{
            document.removeEventListener("click",showMenu)
        }
    },[isLoading])

    const deleteEvent = async() => await deleteTaskItem(taskList.id)

    if(isLoading) return (
        <BaseModal>
            <Modal>
                <ModalContent>
                    <Loading/>
                </ModalContent>
            </Modal>
        </BaseModal>
    )


    if(isEditing) return <EditTaskList taskList={taskList} setOpen={setIsEditing}/>

    return (
        <div className="w-60 bg-white h-fit p-5 absolute shadow-neutral-400 shadow-xl z-100 rounded-2xl min-h-20 animate-in slide-in-from-bottom-2 flex justify-around items-center" style={{ top: y  , left : x}} onClick={(e=>e.preventDefault())} ref={buttonRef}>
            <button className={`p-1 border-amber-500 border-2 rounded-[5px]  ${elementClasses}`} onClick={()=>setIsEditing(true)}>
                <Edit className={`text-amber-500 ${elementClasses} cursor-pointer`}/>
            </button>
            <button className={`p-1 border-red-500 border-2 rounded-[5px] ${elementClasses}`} onClick={deleteEvent}>
                <Trash2 className={`text-red-500 ${elementClasses} cursor-pointer`}/>
            </button>
        </div>
    )
}