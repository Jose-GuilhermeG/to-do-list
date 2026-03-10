import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { FolderXIcon } from "lucide-react";

export default function TaskListNotSelect(){
    return (
            <Empty className="w-full h-full">
                <EmptyHeader>
                    <EmptyMedia>
                        <FolderXIcon className="w-16 h-16"/>
                    </EmptyMedia>
                    <EmptyTitle className="text-3xl">
                        Nenhuma Lista Selecionada
                    </EmptyTitle>
                    <EmptyDescription className="text-2xl">
                        Selecione uma lista para visualizar as tarefas
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
    )
}