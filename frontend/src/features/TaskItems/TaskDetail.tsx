import Loading from "@/components/ui/loading";
import { useContext, useEffect } from "react";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import useGetTaskItemDetail from "@/hooks/useGetTaskItemDetail";
import TaskDetailCard from "./TaskDetailCard";
import type { TaskItemListProtocol, TaskItemProtocol, TaskListProtocol } from "@/types/TaskTypes";
import { TaskContext, type TaskContextProtocol } from "@/contexts/taskContext";


export default function TaskDetail(){

    const {accessToken} = useContext(AuthContext) as AuthContextProtocol
    const {selectTaskItemInfo , selectTaskList , setSelectTask , selectTask } = useContext(TaskContext) as TaskContextProtocol
    const {taskItem , isLoading} = useGetTaskItemDetail(accessToken , (selectTaskList as TaskListProtocol).id , (selectTaskItemInfo as TaskItemListProtocol).id)

    useEffect(()=>{
        if(taskItem) setSelectTask(taskItem)
    },[taskItem ,setSelectTask])

    if(isLoading) return (
        <div className="w-full h-full flex items-center">
            <Loading/>
        </div>
    )

    return (
        <TaskDetailCard task={selectTask || taskItem as TaskItemProtocol} />
    )
}