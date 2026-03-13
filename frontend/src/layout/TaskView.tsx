import type { TaskItemProtocol, TaskListProtocol } from "@/types/TaskTypes";
import { Button } from "@/components/ui/button";
import TaskDetail from "@/features/TaskItems/TaskDetail";
import TaskItemCard from "@/features/TaskItems/TaskItemCard";
import TaskNotSelect from "@/features/TaskItems/TaskNotSelect";
import EmptyTaskList from "@/features/TaskLists/EmptyTaskList";
import useGetTaskItems from "@/hooks/useGetTaskItems";
import { useContext, useEffect, useState } from "react";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import Loading from "@/components/ui/loading";
import TaskItemview from "@/features/TaskItems/TaskItemView";
import CreateTask from "@/features/TaskItems/CreateTask";

interface TaskViewProtocol{
    selectTaskList : TaskListProtocol;
}

export default function TaskView({ selectTaskList } : TaskViewProtocol) {
    const {accessToken} = useContext(AuthContext) as AuthContextProtocol
    const {taskItems ,isLoading , setTaskItems } = useGetTaskItems(accessToken , selectTaskList.id)
    const [selectTaskInfo , setSelectTaskItemInfo] = useState<TaskItemProtocol>()
    const [isEditing , setIsEditingTask] = useState<boolean>(false)
    const [isCreating , setisCreating] = useState<boolean>(false)

    const clearSelectTaskItem = ()=>{
        setSelectTaskItemInfo(undefined)
    }

    const addTaskItem = (taskItem : TaskItemProtocol) => setTaskItems(prev=>[taskItem,...prev])

    if(isLoading) return (    
        <Loading/>
    )

    if(!taskItems.length) return <EmptyTaskList taskListId={selectTaskList.id} setTasks={addTaskItem}/>

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
                {taskItems.map(element=><TaskItemCard taskListId={selectTaskList.id} task={element} onClickEvent={setSelectTaskItemInfo} />)}
            </ul>
            <Button className="rounded-[5px] my-5 bottom-0 h-[10%] w-full cursor-pointer" onClick={()=>setisCreating(true)} >
                Adicionar tarefa
            </Button>
        </div>
        <div className="row-end-3 row-start-2 col-start-2 col-end-3 w-full h-full p-2 grid grid-rows-[90%_10%] gap-2">
            {
            selectTaskInfo ?
            <TaskDetail selectTaskItemId={selectTaskInfo.id} selectTaskListId={selectTaskList.id}/> :
            <TaskNotSelect/>
            }
            {selectTaskInfo &&  
                <Button className="rounded-[5px] my-5 bottom-0 h-full w-full cursor-pointer" variant="outline" onClick={()=>setIsEditingTask(true)}>
                    Editar tarefa
                </Button>
            }
        </div>  

        {isEditing && <TaskItemview setOpen={setIsEditingTask} task={selectTaskInfo } taskListId={selectTaskList.id} />}
        {isCreating && <CreateTask setOpen={setisCreating} taskListId={selectTaskList.id} setTaskItems={addTaskItem}/>}

        
    </div>
    );
}
