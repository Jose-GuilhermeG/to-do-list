import type {TaskListProtocol } from "@/types/TaskTypes";
import { Button } from "@/components/ui/button";
import TaskDetail from "@/features/TaskItems/TaskDetail";
import TaskItemCard from "@/features/TaskItems/TaskItemCard";
import TaskNotSelect from "@/features/TaskItems/TaskNotSelect";
import EmptyTaskList from "@/features/TaskLists/EmptyTaskList";
import useGetTaskItems from "@/hooks/useGetTaskItems";
import { useContext, useEffect, useState } from "react";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import Loading from "@/components/ui/loading";
import { TaskContext, type TaskContextProtocol } from "@/contexts/taskContext";
import CreateTask from "@/features/TaskItems/CreateTask";
import UpdateTask from "@/features/TaskItems/UpdatetaskItem";

interface TaskViewProtocol{
    selectTaskList : TaskListProtocol;
}

export default function TaskView({ selectTaskList } : TaskViewProtocol) {
    const {accessToken} = useContext(AuthContext) as AuthContextProtocol
    const {taskItems ,isLoading } = useGetTaskItems(accessToken , selectTaskList.id)
    const {tasks , setTasks , setSelectTaskList , setSelectTaskItemInfo , selectTaskItemInfo , addTask} = useContext(TaskContext) as TaskContextProtocol
    const [isEditing , setIsEditingTask] = useState<boolean>(false)
    const [isCreating , setisCreating] = useState<boolean>(false)

    useEffect(() => {
        setSelectTaskList(selectTaskList);
        setSelectTaskItemInfo(undefined);
    }, [selectTaskList.id]);


    useEffect(() => {
        if (!isLoading) {
            setTasks(taskItems);
        }
    }, [isLoading, taskItems, setTasks]);


    const clearSelectTaskItem = ()=>{
        setSelectTaskItemInfo(undefined)
    }

    if(isLoading) return (    
        <Loading/>
    )

    if(!tasks.length) return <EmptyTaskList taskListId={selectTaskList.id}/>

    return (
    <div className="w-full h-[95%] rounded-2xl bg-white m-auto shadow-2xl shadow-neutral-400 grid grid-cols-2 grid-rows-[10%_85%] overflow-hidden gap-2 relative">
        <div className="row-start-1 row-end-2 col-end-3 col-start-1 shadow shadow-neutral-200">
            <h1 className="text-3xl font-bold px-10 mt-10">
                {selectTaskList.name}
            </h1>
        </div>
        <div 
            className="row-end-3 row-start-2 col-start-1 col-end-2 w-full max-h-full px-2 relative"
            onDoubleClick={()=>clearSelectTaskItem()}
            >
            <ul className="h-[90%] overflow-y-scroll scroll p-2">
                {tasks.map(element=><TaskItemCard taskListId={selectTaskList.id} task={element} onClickEvent={setSelectTaskItemInfo} key={element.id} />)}
            </ul>
            <Button className="rounded-[5px] my-5 bottom-0 h-[10%] w-full cursor-pointer" onClick={()=>setisCreating(true)} >
                Adicionar tarefa
            </Button>
        </div>
        <div className="row-end-3 row-start-2 col-start-2 col-end-3 w-full h-full p-2 grid grid-rows-[90%_10%] gap-2">
            {
            selectTaskItemInfo ?
            <TaskDetail/> :
            <TaskNotSelect/>
            }
            {selectTaskItemInfo &&  
                <Button className="rounded-[5px] my-5 bottom-0 h-full w-full cursor-pointer" variant="outline" onClick={()=>setIsEditingTask(true)}>
                    Editar tarefa
                </Button>
            }
        </div>  

            {isEditing && <UpdateTask setOpen={setIsEditingTask}/>}
            {isCreating && <CreateTask setOpen={setisCreating}/>}
        </div>
    );
}
