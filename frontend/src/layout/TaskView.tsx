import type { TaskItemProtocol, TaskListProtocol } from "@/types/TaskTypes";
import MDEditor from "@uiw/react-md-editor";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Field , FieldDescription } from "@/components/ui/field";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface TaskViewProtocol{
    selectTaskList : TaskListProtocol;
    tasks : Array<TaskItemProtocol> ;
    selectTask : TaskItemProtocol ;
    setSelectTaskContent(value : string) : void ; 
}

export default function TaskView({ selectTaskList, tasks , selectTask , setSelectTaskContent} : TaskViewProtocol) {
  return (
    <div className="w-full h-[95%] rounded-2xl bg-white m-auto shadow-2xl shadow-neutral-400 grid grid-cols-2 grid-rows-[10%_85%] overflow-hidden gap-2 relative">
        <div className="row-start-1 row-end-2 col-end-3 col-start-1 shadow shadow-neutral-200">
            <h1 className="text-3xl font-bold px-10 mt-10">
                {selectTaskList.name}
            </h1>
        </div>
        <div className="row-end-3 row-start-2 col-start-1 col-end-2 w-full max-h-full px-2 relative">
            <ul className="h-[90%] overflow-y-scroll scroll p-2">
                {tasks.map(element=>(
                   <Field key={element.id} className="w-full my-2 shadow shadow-neutral-200 hover:bg-neutral-200 group cursor-pointer rounded-[5px]">
                        <h1 className="flex px-2 py-3 cursor-pointer text-2xl items-center">
                            <Checkbox className="mx-2 group-hover:border-black"/>  {element.title}
                        </h1>
                        <FieldDescription className="px-5 font-light">
                            {element.description}
                        </FieldDescription>
                        <Separator className="m-auto"/>
                    </Field>
                ))}
            </ul>
            <Button className="rounded-[5px] my-5 bottom-0 h-[10%] w-full cursor-pointer">
                Adicionar tarefa
            </Button>
        </div>
        <div className="row-end-3 row-start-2 col-start-2 col-end-3 w-full h-full p-5" data-color-mode="light">
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
    </div>
  );
}
