import Loading from "@/components/ui/loading";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import { TaskContext, type TaskContextProtocol } from "@/contexts/taskContext";
import CreateTaskList from "@/features/TaskLists/CreateTaskList";
import TaskListNotSelect from "@/features/TaskLists/TaskListNotSelect";
import useGetTaskList from "@/hooks/useGetTaskLists";
import SideBar from "@/layout/SideBar"
import TaskView from "@/layout/TaskView"
import { type TaskListProtocol } from "@/types/TaskTypes";
import { useContext, useEffect, useState } from "react";


export function Home() {
  const {accessToken} = useContext(AuthContext) as AuthContextProtocol
  const {isLoading,  taskLists } = useGetTaskList(accessToken)
  const {setTaskLists , selectTaskList , taskLists : taskListsContext } = useContext(TaskContext) as TaskContextProtocol
  const [haveCreateTaskList , setHaveCreateTaskList] = useState<boolean>(false)

  const addTaskList = (value : TaskListProtocol) : void => setTaskLists([...taskListsContext , value])

  useEffect(()=>{
    if(taskLists) setTaskLists(taskLists)
  },[isLoading])

  if(isLoading) return <Loading/>

  return (
    <main className="h-screen w-screen bg-neutral-100 relative grid grid-cols-[15%_80%] gap-10">
        <CreateTaskList open={haveCreateTaskList} setOpen={setHaveCreateTaskList} setTaskLists={addTaskList}/>
        <SideBar createTaskList={()=>setHaveCreateTaskList(true)}/>
        {selectTaskList ? 
          <TaskView selectTaskList={selectTaskList}/>:
          <TaskListNotSelect/>
        }
    </main>
  )
}

export default Home
