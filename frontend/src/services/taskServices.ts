import type { TaskItemListProtocol, TaskItemProtocol, TaskListProtocol } from "@/types/TaskTypes"
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
