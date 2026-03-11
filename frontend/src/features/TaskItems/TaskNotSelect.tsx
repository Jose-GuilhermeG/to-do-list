import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ListX} from "lucide-react"

export default function TaskNotSelect(){
    return (
        <div className="flex justify-center items-center h-4/5 w-full">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia className="bg-neutral-20">
                        <ListX className="w-10 h-10"/>
                    </EmptyMedia>
                    <EmptyTitle className="text-2xl w-full">
                        Nenhuma Tarefa selecionada
                    </EmptyTitle>
                    <EmptyDescription className="text-xl">
                        Selecione uma tarefa para ver seus detalhes
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    )
}