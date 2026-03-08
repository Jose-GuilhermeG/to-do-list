import type { TaskItemProtocol } from "@/types/TaskTypes";
import MDEditor from "@uiw/react-md-editor";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Field , FieldDescription } from "@/components/ui/field";

interface TaskViewProtocol{
    tasks : Array<TaskItemProtocol> ;
    selectTask : TaskItemProtocol ;
    setSelectTaskContent(value : string) : void ; 
}

export default function TaskView({tasks , selectTask , setSelectTaskContent} : TaskViewProtocol) {
  return (
    <div className="w-full h-[95%] rounded-2xl bg-white m-auto grid grid-cols-2 grid-rows-[10%_85%] overflow-hidden">
        <div className="row-end-3 row-start-2 col-start-1 col-end-2 border-t-2 border-l-2 w-full max-h-full overflow-y-scroll p-5">
            <ul className="">
                {tasks.map(element=>(
                   <Field key={element.id} className="w-full hover:bg-neutral-200 group">
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
        </div>
        <div className="row-end-3 row-start-2 col-start-2 col-end-3 border-t-2 border-l-2 w-full h-full p-5" data-color-mode="light">
            <h1>
                {selectTask.title}
            </h1>
            {/*<MDEditor.Markdown source={task.content} className="w-full h-full"/>*/}
            {/*<MDEditor value={content} onChange={(value) => setContent(value || "")} hideToolbar={false} visibleDragbar={false} preview="edit"/>*/}
        </div>
    </div>
  );
}
