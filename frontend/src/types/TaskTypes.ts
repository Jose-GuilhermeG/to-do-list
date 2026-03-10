export interface TaskItemListProtocol{
    id : number;
    title : string;
    description? : string;
    status : "pending" | "in_progress" | "completed";
}
export interface TaskItemProtocol extends TaskItemListProtocol{
    content? : string;
}

export interface TaskListProtocol{
    id : number,
    name : string,
    description? : string,
}
