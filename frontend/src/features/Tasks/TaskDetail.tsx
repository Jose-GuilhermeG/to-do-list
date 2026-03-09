import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import type { TaskItemProtocol } from "@/types/TaskTypes";
import { Separator } from "@/components/ui/separator"; 
import { Button } from "@/components/ui/button";

export default function TaskDetail({selectTask} : {selectTask : TaskItemProtocol}){
    return (
        <div className="w-full h-full">
            <h1 className="text-2xl text-center my-5 h-[10%]">
                {selectTask.title}
            </h1>
            <p>
                {selectTask.description}
            </p>
            <Separator/>
            <div className="h-[75%] my-2">
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
                    {selectTask.content}
                </ReactMarkdown>
            </div>
            <Button className="rounded-[5px] my-5 bottom-0 h-[10%] w-full cursor-pointer" variant="outline">
                Editar tarefa
            </Button>
        </div>
    )
}