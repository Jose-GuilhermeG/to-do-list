import { BaseModal } from "@/components/ui/modal";
import React, { useState } from "react";
import MdEditor from "@uiw/react-md-editor";
import "react-markdown-editor-lite/lib/index.css";
import TaskDetailCard from "./TaskDetailCard";
import { Separator } from "@/components/ui/separator";
import type { CreateTaskItemProtocol, TaskItemProtocol } from "@/types/TaskTypes";
import { Button } from "@/components/ui/button";

interface TaskItemViewProtocol{
    setOpen : (value : boolean) => void;
    task? : TaskItemProtocol;
    onSubmitEvent : (e : React.SubmitEvent , data : CreateTaskItemProtocol) => Promise<void>
}

export default function TaskItemview({setOpen , task , onSubmitEvent} : TaskItemViewProtocol ){
    const [title, setTitle] = useState<string>(task?.title || "");
    const [description, setDescription] = useState<string>((task?.description || ""));
    const [content, setContent] = useState<string>(task?.content || "");


    const setValue = (e : React.InputEvent , funcSet : (value : string) => void) : void =>{
        const element = e.target as HTMLInputElement;
        funcSet(element.value)
    }


    return (
        <BaseModal onClick={()=>setOpen(false)}>
            <form method="post" className="bg-white p-5 w-4/5 h-4/5 m-auto rounded-2xl relative grid grid-rows-[25%_75%] grid-cols-2 " data-color-mode="light" onClick={(e)=>e.stopPropagation()} onSubmit={(e)=>onSubmitEvent(e,{title , description , content})}>
                <div className="w-full h-full row-start-1 row-end-2 col-start-1 col-end-2">
                        <textarea 
                            className="w-full outline-none text-2xl text-center py-5 h-[50%]" 
                            onInput={e=>setValue(e , setTitle)} 
                            value={title} 
                            id="titleDisplay"
                            placeholder="Escreva o titulo da tarefa"
                            required
                            />
                        <p>
                            <textarea 
                                value={description} 
                                className="w-full outline-none" 
                                onInput={e=>setValue(e , setDescription)}
                                id="descriptionDisplay"
                                placeholder="Escreva a descrição da tarefa"
                                />
                        </p>
                        <Separator/>
                    </div>
                <div className="h-full my-2 col-start-1 col-end-2 row-start-2 row-end-3">
                     <MdEditor
                        value={content}
                        onChange={(val) => setContent(val || "")}
                        height="100%"
                        preview="edit"
                        hideToolbar={false}
                    />
                </div>
                <div className="w-full h-full row-start-1 row-end-3 col-start-2 col-end-3 grid grid-rows-[90%_10%] px-2">
                    <TaskDetailCard task={{title , description , content}} />
                    <Button className="h-full w-full my-2 cursor-pointer">
                        { task ? "Salvar" : "Criar"}
                    </Button>
                </div>
            </form>
        </BaseModal>
    )
}