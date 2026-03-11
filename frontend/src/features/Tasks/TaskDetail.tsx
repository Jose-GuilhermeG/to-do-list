

import Loading from "@/components/ui/loading";
import { useContext } from "react";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import useGetTaskItemDetail from "@/hooks/useGetTaskItemDetail";
import TaskDetailCard from "./TaskDetailCard";
import type { TaskItemProtocol } from "@/types/TaskTypes";

interface TaskDetailProtocol{
    selectTaskListId : number;
    selectTaskItemId : number;
}

export default function TaskDetail({selectTaskItemId , selectTaskListId} : TaskDetailProtocol){

    const {accessToken} = useContext(AuthContext) as AuthContextProtocol
    const {taskItem, errors , isLoading} = useGetTaskItemDetail(accessToken , selectTaskItemId , selectTaskListId)

    if(isLoading) return (
        <div className="w-full h-full flex items-center">
            <Loading/>
        </div>
    )

    return (
        <TaskDetailCard task={taskItem as TaskItemProtocol} />
    )
}