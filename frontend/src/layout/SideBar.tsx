import { Separator } from "@/components/ui/separator";
import { ListChecks , Folder , Plus, Settings, CircleQuestionMark } from "lucide-react";
import { Link } from "react-router-dom";

interface TaskListProtocol{
    id : number,
    name : string
}

export default function SideBar({taskLists} : {taskLists : TaskListProtocol[]}){
    return (
        <aside className="h-screen w-[15%] bg-white static top-0 left-0 shadow shadow-neutral-200 grid grid-rows-3">
            <div className="w-full h-full flex flex-col items-center row-start-1 row-end-3">
                <div className="w-full min-h-10 grid grid-cols-2 grid-rows-1 my-10">
                    <h1 className="text-2xl flex items-center mx-10">
                        Listas
                        <ListChecks className="mx-2"/>
                    </h1>
                    <button className="justify-self-center cursor-pointer">
                        <Plus className="hover:text-neutral-400"/>
                    </button>
                </div>
                <ul className="w-full flex flex-col justify-around items-center h-[50%] min-h-10">
                    {taskLists.map(element=>(
                        <li key={element.id} className="w-full hover:bg-neutral-200">
                            <button className="w-4/5 m-auto flex px-2 py-4 cursor-pointer">
                                <Folder className="mr-10"/> {element.name}
                            </button>
                            <Separator className="max-w-4/5 m-auto"/>
                        </li>
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
                </ul>
            </div>

        </aside>
    )
}