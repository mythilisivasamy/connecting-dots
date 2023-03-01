import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormGroup,FormControl} from '@angular/forms';
import {Router } from '@angular/router';
import {Todo} from '../todo-model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
 _todo!:Todo;
 addTodoForm=new FormGroup({
  todo:new FormControl(''),
  completed:new FormControl(''),
  userId:new FormControl('')

 })
  constructor(private todoService:TodoService,private router:Router ) { }
  
  ngOnInit(): void {}

  get todo(){
    return this.addTodoForm.get('todo') as FormControl;
  }

  get completed(){
    return this.addTodoForm.get('completed') as FormControl;
  }

  get userId(){
    return this.addTodoForm.get('userId') as FormControl;
  }

  addTodo() {
    console.log('addtodo');
    const data:Todo = {
      todo: this.todo.value,
      completed: this.completed.value,
      userId:this.userId.value
    };

    this.todoService.createTodo(data).subscribe(response => {
      console.log(response);
      this.router.navigate(['']);
      
    });
  }
    
  }


