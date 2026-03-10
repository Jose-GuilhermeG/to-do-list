import Loading from "@/components/ui/loading";
import { AuthContext, type AuthContextProtocol } from "@/contexts/authContext";
import TaskListNotSelect from "@/features/Tasks/TaskListNotSelect";
import useGetTaskList from "@/hooks/useGetTaskLists";
import SideBar from "@/layout/SideBar"
import TaskView from "@/layout/TaskView"
import { type TaskListProtocol } from "@/types/TaskTypes";
import { useContext, useState } from "react";

export function Home() {
  const {accessToken} = useContext(AuthContext) as AuthContextProtocol
  const {isLoading,  taskLists} = useGetTaskList(accessToken)
  const [selectTaskList , setSelectTaskListState] = useState<TaskListProtocol>()
  const setSelectTask = (taskList : TaskListProtocol) : void => setSelectTaskListState(taskLists.find(element=>element.id == taskList.id))


  if(isLoading) return <Loading/>

  return (
    <main className="h-screen w-screen bg-neutral-100 relative grid grid-cols-[15%_80%] gap-10">
      <SideBar taskListselected={selectTaskList} taskLists={taskLists} selectTaskList={setSelectTask}/>
      {selectTaskList ? 
        <TaskView selectTaskList={selectTaskList}/> :
        <TaskListNotSelect/>
      }
    </main>
  )
}

export default Home
