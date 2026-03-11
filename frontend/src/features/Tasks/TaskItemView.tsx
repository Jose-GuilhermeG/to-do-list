import { BaseModal } from "@/components/ui/modal";
import React, { useEffect, useRef, useState } from "react";
import MdEditor from "@uiw/react-md-editor";
import "react-markdown-editor-lite/lib/index.css";
import TaskDetailCard from "./TaskDetailCard";
import { Separator } from "@/components/ui/separator";
import type { TaskItemProtocol } from "@/types/TaskTypes";
import { Button } from "@/components/ui/button";

interface TaskItemViewProtocol{
    setOpen : (value : boolean) => void;
    task? : TaskItemProtocol;
    taskListId : number;    
}

export default function TaskItemview({setOpen , task} : TaskItemViewProtocol ){
    const [title, setTitle] = useState<string>(task?.title || "Escreva o titulo da tarefa");
    const [description, setDescription] = useState<string>((task?.description || "Escreva a descrição da tarefa"));
    const [content, setContent] = useState<string>(task?.content || "");
    const refs = useRef<Record<string, HTMLTextAreaElement | null>>({});

    useEffect(()=>{
    },[task])

    const handleBlur = (id: string, setValue: (v: string) => void) => {
    const el = refs.current[id];
    if (el && !el.value.trim()) {
      setValue("Digite algo");
    }
  };

    const setValue = (e : React.InputEvent , funcSet : (value : string) => void) : void =>{
        const element = e.target as HTMLInputElement;
        funcSet(element.value)
    }

    const setRef = (id: string) => (el: HTMLTextAreaElement | null) => {
        refs.current[id] = el;
    };

    return (
        <BaseModal onClick={()=>setOpen(false)}>
            <div className="bg-white p-5 w-4/5 h-4/5 m-auto rounded-2xl relative grid grid-rows-[25%_75%] grid-cols-2 " data-color-mode="light" onClick={(e)=>e.stopPropagation()}>
                <div className="w-full h-full row-start-1 row-end-2 col-start-1 col-end-2">
                        <textarea 
                            className="w-full outline-none text-2xl text-center py-5 h-[50%]" 
                            onInput={e=>setValue(e , setTitle)} 
                            ref={setRef("titleDisplay")}
                            value={title} 
                            id="titleDisplay"
                            onBlur={() => handleBlur("titleDisplay", setTitle)}
                            />
                        <p>
                            <textarea 
                                value={description} 
                                className="w-full outline-none" 
                                ref={setRef("descriptionDisplay")}
                                onInput={e=>setValue(e , setDescription)}
                                onBlur={() => handleBlur("descriptionDisplay", setDescription)}
                                id="descriptionDisplay"
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
            </div>
        </BaseModal>
    )
}