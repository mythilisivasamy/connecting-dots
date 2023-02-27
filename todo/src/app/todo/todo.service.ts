import { Injectable } from '@angular/core';
import {Todo,Todos} from './todo-model';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, retry,tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl='https://dummyjson.com/todos';
  todos$!:Observable<Todos>;
  headerOptions = { 'content-type': 'application/json'} 
  constructor(private http:HttpClient) {
    this.todos$=this.getTodos();
   }

   private handleError(errorResponse : HttpErrorResponse){

    if(errorResponse instanceof ErrorEvent){
      console.error(`client error,${errorResponse}`)
    }
    else{
     console.error(`server side error`)
    }
   return throwError(()=>'there is a error with service');
  }

  getTodos():Observable<Todos>{
    return this.http.get<Todos>(this.todoUrl,{reportProgress:true}).pipe(
      retry(2),
      tap((val)=>console.log("id",val.todos)),
      catchError(this.handleError)
    );
  }

  getTodo(id:string):Observable<Todo | undefined>{
    return this.todos$.pipe(
      map((todos)=> todos.todos.find(todo => todo.id === +id)))
   }

  createTodo(todo:Todo): Observable<any> {
    console.log(todo);
     return this.http.post<Todo>(`${this.todoUrl}/add`,todo,{headers:this.headerOptions}).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  editTodo(todo:Todo): Observable<any> {
    //console.log(`${this.todoUrl}/${todo.id},${todo.completed}`);
    return this.http.put(`${this.todoUrl}/${todo.id}`,{completed:todo.completed},{headers:this.headerOptions}).pipe(
      retry(2),
      catchError(this.handleError)
      );
  }


  deleteTodo(id:number|string):Observable<any>{
    console.log(`${this.todoUrl}/${id}`);
      return this.http.delete(`${this.todoUrl}/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
      );
    }

  }


