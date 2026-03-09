import type { TaskItemProtocol, TaskListProtocol } from "@/types/TaskTypes";
import { Button } from "@/components/ui/button";
import TaskDetail from "@/features/Tasks/TaskDetail";
import TaskItemCard from "@/features/Tasks/TaskItemCard";
import TaskNotSelect from "@/features/Tasks/TaskNotSelect";
import EmptyTaskList from "@/features/Tasks/EmptyTaskList";

interface TaskViewProtocol{
    selectTaskList : TaskListProtocol;
    tasks : Array<TaskItemProtocol> ;
    selectTask? : TaskItemProtocol ;
    setSelectTaskContent(value : string) : void ; 
}

export default function TaskView({ selectTaskList, tasks , selectTask , setSelectTaskContent} : TaskViewProtocol) {
  if(!tasks.length) return <EmptyTaskList/>

  return (
    <div className="w-full h-[95%] rounded-2xl bg-white m-auto shadow-2xl shadow-neutral-400 grid grid-cols-2 grid-rows-[10%_85%] overflow-hidden gap-2 relative">
        <div className="row-start-1 row-end-2 col-end-3 col-start-1 shadow shadow-neutral-200">
            <h1 className="text-3xl font-bold px-10 mt-10">
                {selectTaskList.name}
            </h1>
        </div>
        <div className="row-end-3 row-start-2 col-start-1 col-end-2 w-full max-h-full px-2 relative">
            <ul className="h-[90%] overflow-y-scroll scroll p-2">
                {tasks.map(element=><TaskItemCard task={element} />)}
            </ul>
            <Button className="rounded-[5px] my-5 bottom-0 h-[10%] w-full cursor-pointer">
                Adicionar tarefa
            </Button>
        </div>
        <div className="row-end-3 row-start-2 col-start-2 col-end-3 w-full h-full p-5" data-color-mode="light">
            {
            selectTask ?
            <TaskDetail selectTask={selectTask} /> :
            <TaskNotSelect/>
            }
        </div>
    </div>
  );
}
