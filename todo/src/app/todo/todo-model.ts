export interface Todo{
    id?:number;
    todo:string;
    completed:boolean;
    userId:number;
}

export interface Todos{
    _id?:string | number,
    todos:Todo[];
    total?:number;
    skip?:number;
    limit?:number;

}