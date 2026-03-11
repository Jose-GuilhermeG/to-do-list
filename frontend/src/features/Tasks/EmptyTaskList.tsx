import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import {FolderXIcon} from "lucide-react"
import { useState } from "react";
import TaskItemview from "./TaskItemView";

export default function EmptyTaskList(){
    const [isCreating , setIsCreating] = useState<boolean>(false)

    return (
        <div className="w-full h-[95%] rounded-2xl bg-white m-auto shadow-2xl shadow-neutral-400 flex justify-center items-center">
            <Empty className="w-full h-full">
                <EmptyHeader>
                    <EmptyMedia>
                        <FolderXIcon className="w-16 h-16"/>
                    </EmptyMedia>
                    <EmptyTitle className="text-3xl">
                        Nenhuma Tarefa nessa Lista
                    </EmptyTitle>
                    <EmptyDescription className="text-2xl my-2">
                        Crie uma tarefas para poder visualizar
                    </EmptyDescription>
                    <EmptyContent>
                        <Button className="w-full my-5 p-5 cursor-pointer" onClick={()=>setIsCreating(true)}>
                            Criar Tarefa
                        </Button>
                    </EmptyContent>
                </EmptyHeader>
            </Empty>
            {isCreating && <TaskItemview setOpen={setIsCreating} />}
        </div>
    )
}