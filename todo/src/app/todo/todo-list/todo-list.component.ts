import { Component, OnInit } from '@angular/core';
import { Observable,of} from 'rxjs';
import {Todo,Todos} from '../todo-model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList$!:Observable<Todo[]>;
  todoList:Todo[]=[];
  isProgress!:boolean;
  constructor(private ts:TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(){
    this.ts.getTodos().subscribe(
      todos=> {
        if(todos===null){
          this.isProgress=true;
        }
        this.todoList$=of(todos.todos)
      },
        
      (err)=>{
        console.log(err);
      }

  )}
}
