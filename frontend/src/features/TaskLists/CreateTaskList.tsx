import React, { useContext, useEffect, useState } from "react";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import useCreateTaskList from "@/hooks/useCreateTaskList";
import type { TaskListProtocol } from "@/types/TaskTypes";
import TaskListDatail from "./TaskListDetail";

interface createTaskListProtocol{
    open : boolean ;
    setOpen : (value :boolean) => void;
    setTaskLists : (value : TaskListProtocol) => void
}

export default function CreateTaskList({open , setOpen , setTaskLists} : createTaskListProtocol){
    const {accessToken} = useContext(AuthContext) as AuthContextProtocol
    const [taskListName , setTaskListName ] = useState<string>("")
    const {createTaskList , taskList , isLoading , isCreated} = useCreateTaskList()
    
    useEffect(()=>{
        if(isCreated){ 
            setOpen(false)
            setTaskLists(taskList as TaskListProtocol)
        }
    },[isCreated])

    if(!open) return <></>

    const handlerSubmit = async (e : React.SubmitEvent) =>{
        e.preventDefault()
        await createTaskList(accessToken , taskListName)
    }


    return <TaskListDatail isLoading={isLoading} onSubmit={handlerSubmit} setOpen={setOpen} setTaskListName={setTaskListName} taskListName={taskListName} />
}