import useUpdateListTask from "@/hooks/useUpdateTaskList";
import TaskListDatail from "./TaskListDetail";
import type { TaskListProtocol } from "@/types/TaskTypes";
import { useContext, useEffect, useState } from "react";
import { TaskContext, type TaskContextProtocol } from "@/contexts/taskContext";

export default function EditTaskList({taskList , setOpen} : {taskList : TaskListProtocol , setOpen : (value : boolean)=>void}){
    const {isLoading , isUpdated ,taskList : updateTaskList , updateTask} = useUpdateListTask()
    const [listName , setListName] = useState<string>(taskList.name)
    const {setTaskLists , taskLists} = useContext(TaskContext) as TaskContextProtocol

    useEffect(()=>{
        if(isUpdated){ 
            setTaskLists(taskLists.map(element=>element.id == updateTaskList?.id ? updateTaskList : element)) 
            setOpen(false)
        }
    },[isUpdated])

    const onSubmit = async()=>{
        await updateTask(listName , taskList.id)
    }

    return (
        <TaskListDatail onSubmit={onSubmit} isLoading={isLoading} setOpen={setOpen} taskListName={listName} setTaskListName={setListName}/>
    )
}