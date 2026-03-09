import SideBar from "@/layout/SideBar"
import TaskView from "@/layout/TaskView"
import type { TaskItemProtocol } from "@/types/TaskTypes";
import { useState } from "react";

export function Home() {
  const taskLists = [
    {id : 0 , name : "teste"},
    {id : 0 , name : "teste"},
    {id : 0 , name : "teste"},
  ]
  const taskItems : TaskItemProtocol[] = [
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
    {id : 0 , title : "teste" , status : "in_progress" , description : "teste de descrição"},
  ]
  const [taskItem , setTaskItem] = useState<TaskItemProtocol>(
    {
      id : 0,
      title : "Teste de item",
      status : "in_progress",
      content : `# Teste de Task \n ## lista de coisas \n - Item 1 \n - Item 2 \n- Item 3`
    }
  );

  const setTaskContent = (value : string) : void =>{
    setTaskItem(prev=>{
      return {...prev , content : value}
    })
  }

  return (
    <main className="h-screen w-screen bg-neutral-100 relative grid grid-cols-[15%_80%] gap-10">
      <SideBar taskLists={taskLists}/>
      <TaskView 
        selectTaskList={taskLists[0]}
        tasks={taskItems}
        selectTask={taskItem}
        setSelectTaskContent={setTaskContent} />
    </main>
  )
}

export default Home
