import { useContext, useEffect } from "react";
import TaskItemview from "./TaskItemView";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import useCreateTask from "@/hooks/useCreateTask";
import type { CreateTaskItemProtocol } from "@/types/TaskTypes";
import { BaseModal, Modal, ModalHeader } from "@/components/ui/modal";
import Loading from "@/components/ui/loading";

interface CreateTaskProtocol{
    taskListId : number ;
    setOpen : (value : boolean) => void;
    setTaskItems : (value : TaskItemProtocol) => void;
}

export default function CreateTask({ taskListId , setOpen , setTaskItems } : CreateTaskProtocol){
    const {accessToken} = useContext(AuthContext) as AuthContextProtocol
    const {isLoading , isCreate  , createTask , taskItem } = useCreateTask()

    useEffect(()=>{
        if(taskItem) setTaskItems(taskItem)
    },[taskItem])

    const createTaskEvent = async (e : React.SubmitEvent , data : CreateTaskItemProtocol) => {
        e.preventDefault()
        await createTask(data , accessToken , taskListId)
    }

    if(isCreate) setOpen(false)

    if(isLoading) return (
        <BaseModal>
            <Modal>
                <ModalHeader>
                    <Loading/>
                </ModalHeader>
            </Modal>
        </BaseModal>
    )

    return <TaskItemview setOpen={setOpen} onSubmitEvent={createTaskEvent} />
}