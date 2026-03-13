import { Separator } from "@/components/ui/separator"; 
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface TaskDetailCard{
    task : {
        title : string ,
        description? : string,
        content? : string
    }
}

export default function TaskDetailCard({task} : TaskDetailCard){
    return (
        <div className="w-full h-full">
            <h1 className="text-2xl text-center my-5 h-[10%]">
                {task?.title || "Escreva o titulo da tarefa"}
            </h1>
            <p>
                {task?.description || "Tarefa sem descrição"}
            </p>
            <Separator/>
            <div className="h-[75%] my-2">
                {
                    task?.content ? 
                        <ReactMarkdown
                            components={{
                                h1 : ({children})=><h1 className="text-3xl font-bold m-2">{children}</h1>,
                                h2 : ({children})=><h2 className="text-2xl font-medium m-2">{children}</h2>,
                                h3 : ({children})=><h3 className="text font-medium m-2">{children}</h3>,
                                ul : ({children})=><ul className="m-2 flex flex-col">{children}</ul>,
                                li : ({children})=><li className="font-medium px-3 list-disc">{children}</li>,
                            }}
                            rehypePlugins={[remarkGfm]}
                        >
                            {task?.content}
                        </ReactMarkdown>:
                        <h1 className="text-2xl font-bold mt-50 text-center">
                            Nenhum conteudo para essa tarefa
                        </h1>
                }
            </div>
        </div>
    )
}