import { useContext, useEffect } from "react";
import TaskItemview from "./TaskItemView";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import type { CreateTaskItemProtocol, TaskItemListProtocol, TaskListProtocol } from "@/types/TaskTypes";
import { BaseModal, Modal, ModalHeader } from "@/components/ui/modal";
import Loading from "@/components/ui/loading";
import { TaskContext, type TaskContextProtocol } from "@/contexts/taskContext";
import useUpdateTask from "@/hooks/useUpdateTask";

interface CreateTaskProtocol{
    setOpen : (value : boolean) => void;
}

export default function UpdateTask({setOpen} : CreateTaskProtocol){
    const {accessToken} = useContext(AuthContext) as AuthContextProtocol
    const {isLoading  , taskItem , isUpdated , updateTask} = useUpdateTask()
    const {selectTaskList , selectTask , setTasks , tasks , selectTaskItemInfo , setSelectTask} = useContext(TaskContext) as TaskContextProtocol
    const taskListId = (selectTaskList as TaskListProtocol).id
    const taskItemId = (selectTaskItemInfo as TaskItemListProtocol).id

    useEffect(()=>{
        if(taskItem){
            setTasks([...tasks.map(task => task.id == selectTask?.id ? taskItem : task)])
            setSelectTask(taskItem)
        } 
    },[isUpdated])

    const updateTaskEvent = async (e : React.SubmitEvent , data : CreateTaskItemProtocol) => {
        e.preventDefault()
        await updateTask(data , accessToken , taskListId , taskItemId )
    }

    if(isUpdated) setOpen(false)

    if(isLoading) return (
        <BaseModal>
            <Modal>
                <ModalHeader>
                    <Loading/>
                </ModalHeader>
            </Modal>
        </BaseModal>
    )

    return <TaskItemview setOpen={setOpen} onSubmitEvent={updateTaskEvent} task={selectTask} />
}