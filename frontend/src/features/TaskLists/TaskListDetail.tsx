import type React from "react";
import {BaseModal, Modal, ModalContent, ModalHeader, ModalMedia, ModalTitle} from "@/components/ui/modal";
import {Plus} from "lucide-react"
import { Field, FieldContent, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";


interface TaskListDetailProtocol{
    setOpen :( value : boolean ) => void;
    isLoading : boolean;
    onSubmit : (e : React.SubmitEvent) => Promise<void>;
    setTaskListName : (value : string) => void;
    taskListName? : string
}

export default function TaskListDatail({setOpen , isLoading , onSubmit , setTaskListName , taskListName} : TaskListDetailProtocol){
    return (
        <BaseModal onClick={()=>setOpen(false)}>
            <Modal onClick={(e)=>e.stopPropagation()} className="animate-in slide-in-from-bottom-2">
                <ModalHeader>
                    <ModalMedia>
                    <Plus/>
                    </ModalMedia>
                    <ModalTitle>
                    {taskListName ? "Editar sua Lista de tarefas" : "Criar Lista de tarefas"}
                    </ModalTitle>
                </ModalHeader>
                <ModalContent>
                {
                    isLoading?
                    <Loading/>:
                    <form onSubmit={onSubmit}>
                        <FieldSet>
                        <FieldGroup>
                            <Field>
                            <FieldLabel htmlFor="listName">
                                Nome da lista
                            </FieldLabel>
                            <Input id="listName" value={taskListName} onChange={(e)=>setTaskListName(e.target.value)} required />
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