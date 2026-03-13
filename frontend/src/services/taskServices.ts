import type { CreateTaskItemProtocol, TaskItemListProtocol, TaskItemProtocol, TaskListProtocol } from "@/types/TaskTypes"
import { createServiceHerder } from "@/utils/servicesUtils"
import axios, { type AxiosPromise } from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const BASEURLPATH = "lists"
const BASEURL = API_BASE_URL + BASEURLPATH

const requests = axios.create({
    baseURL : BASEURL,
    timeout : 5000
})

export const getTaskListsServices = (accessToken : string) : Promise<AxiosPromise<TaskListProtocol[]>> =>{
    return requests.get(
        "",
        {headers : createServiceHerder("Bearer" , accessToken)}
    )
}

export const getTaskItemsService = async (accessToken : string , id : number) : Promise<AxiosPromise<TaskItemListProtocol[]>>=>{
    const url = `${id}/tasks/`;
    return requests.get(
        url ,
        {headers : createServiceHerder("Bearer" , accessToken)}
    )
}

export const getTaskItemDetailService = async (accessToken : string , taskListId : number , taskItemId : number) : Promise<AxiosPromise<TaskItemProtocol>> =>{
    const url = `${taskListId}/tasks/${taskItemId}/`;
    return requests.get(
        url,
        {headers : createServiceHerder("Bearer" , accessToken)}
    )
}

export const createTasklistService = async (accessToken : string , name : string) : Promise<AxiosPromise<TaskListProtocol>> =>{
    return requests.post(
        "/",
        {name},
        {headers : createServiceHerder("Bearer" , accessToken)}
    )
}

export const setTaskItemStatusService = async (taskItemId : number , taskListId : number , status : TaskItemProtocol["status"] , accessToken : string) : Promise<AxiosPromise<TaskItemProtocol>> =>{
    const url = `${taskListId}/tasks/${taskItemId}/`
    return requests.patch(
        url,
        {status : status},
        {headers : createServiceHerder("Bearer" , accessToken)}
    )
}

export const createTaskItemService = async (data : CreateTaskItemProtocol , accessToken : string , taskListId : number ) : Promise<AxiosPromise<TaskItemProtocol>> =>{
    const url = `${taskListId}/tasks/`
    return requests.post(
        url,
        data,
        {headers : createServiceHerder("Bearer" , accessToken)}
    )
}