import {BaseModal, Modal, ModalContent, ModalHeader, ModalMedia, ModalTitle} from "@/components/ui/modal";
import {Plus} from "lucide-react"
import { Field, FieldContent, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import useCreateTaskList from "@/hooks/useCreateTaskList";
import Loading from "@/components/ui/loading";
import type { TaskListProtocol } from "@/types/TaskTypes";

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


    return (
         <BaseModal onClick={()=>setOpen(false)}>
            <Modal onClick={(e)=>e.stopPropagation()}>
                <ModalHeader>
                    <ModalMedia>
                    <Plus/>
                    </ModalMedia>
                    <ModalTitle>
                    Criar Lista de tarefas
                    </ModalTitle>
                </ModalHeader>
                <ModalContent>
                {
                    isLoading?
                    <Loading/>:
                    <form onSubmit={handlerSubmit}>
                        <FieldSet>
                        <FieldGroup>
                            <Field>
                            <FieldLabel htmlFor="listName">
                                Nome da lista
                            </FieldLabel>
                            <Input id="listName" onChange={(e)=>setTaskListName(e.target.value)} required />
                            </Field>
                        </FieldGroup>
                        <FieldContent>
                            <Button>
                            Salvar Lista
                            </Button>
                        </FieldContent>
                        </FieldSet>
                    </form>
                }
                </ModalContent>
            </Modal>
        </BaseModal>
    )
}