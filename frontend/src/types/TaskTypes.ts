export interface TaskItemProtocol{
    id : number;
    title : string;
    description? : string;
    content? : string;
    status : "pending" | "in_progress" | "completed";
}