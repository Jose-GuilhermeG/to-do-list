import type { TaskItemListProtocol, TaskItemProtocol, TaskListProtocol } from "@/types/TaskTypes"
import React, { createContext, useState } from "react";

export interface TaskContextProtocol{
    selectTaskList? : TaskListProtocol;
    selectTaskItemInfo? : TaskItemListProtocol;
    tasks : TaskItemListProtocol[];
    selectTask : TaskItemProtocol | undefined;
    setSelectTask : (value : TaskItemProtocol | undefined) => void
    setSelectTaskItemInfo : (value : TaskItemListProtocol | undefined) => void;
    setSelectTaskList : (value : TaskListProtocol) => void;
    addTask : (value : TaskItemListProtocol) => void;
    setTasks : (value : TaskItemListProtocol[] ) => void;
    updateTask : (value : TaskItemListProtocol) => void;
}

export const TaskContext = createContext<TaskContextProtocol | null>(null)

export function TaskProvider({children} : {children : React.ReactElement}){
    const [selectTaskList , setSelectTaskList] = useState<TaskListProtocol>()
    const [selectTask , setSelectTask] = useState<TaskItemProtocol>()
    const [selectTaskItemInfo , setSelectTaskItemInfo] = useState<TaskItemListProtocol>()
    const [tasks , setTasks] = useState<TaskItemListProtocol[]>([])

    const addTask = (value : TaskItemListProtocol) => setTasks(prev=>[value,...prev])

    const updateTask = (value : TaskItemListProtocol) => setTasks(prev => prev.map(task => task.id === value.id ? value : task))


    return (
        <TaskContext.Provider value={{ selectTask , setSelectTask ,selectTaskItemInfo , setTasks  , setSelectTaskItemInfo, selectTaskList , setSelectTaskList , addTask , tasks , updateTask}}>
            {children}
        </TaskContext.Provider>
    )
}