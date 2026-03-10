import TaskListCard from "@/features/Tasks/TaskListCard";
import type { TaskListProtocol } from "@/types/TaskTypes";
import { ListChecks , Plus, Settings, CircleQuestionMark, LogOut } from "lucide-react";
import { Link } from "react-router-dom";


interface sideBarProtocol{
    taskLists : TaskListProtocol[] ; 
    taskListselected? : TaskListProtocol ; 
    selectTaskList : (task : TaskListProtocol)=>void;
    createTaskList : ()=>void
}

export default function SideBar({taskLists , createTaskList , taskListselected , selectTaskList} : sideBarProtocol){
    return (
        <aside className="h-screen w-full bg-white top-0 left-0 shadow shadow-neutral-200 grid grid-rows-3">
            <div className="w-full h-full flex flex-col items-center row-start-1 row-end-3">
                <div className="w-full min-h-10 grid grid-cols-2 grid-rows-1 my-10">
                    <h1 className="text-2xl flex items-center mx-10">
                        Listas
                        <ListChecks className="mx-2"/>
                    </h1>
                    <button className="justify-self-center cursor-pointer" onClick={createTaskList}>
                        <Plus className="hover:text-neutral-400"/>
                    </button>
                </div>
                <ul className="w-full flex flex-col justify-start items-center h-[50%] min-h-10">
                    {taskLists.map(element=>(
                        <TaskListCard taskList={element} onClickEvent={selectTaskList} isSelect={taskListselected?.id == element.id} />
                    ))}
                </ul>
            </div>
            <div className="h-full w-full grid items-end">
                <ul className="w-full flex justify-around items-center mb-10">
                    <li>
                        <Link>
                            <Settings/>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <CircleQuestionMark/>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <LogOut/>
                        </Link>
                    </li>
                </ul>
            </div>

        </aside>
    )
}