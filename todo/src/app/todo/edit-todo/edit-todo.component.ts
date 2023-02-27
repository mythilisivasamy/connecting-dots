import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl} from '@angular/forms';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {Todo,Todos} from '../todo-model';
import { TodoService } from '../todo.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  _todo!:Todo;
  editForm=new FormGroup({
    id:new FormControl(''),
    todo:new FormControl(''),
    completed:new FormControl(''),
    userId:new FormControl('')
  })
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((param: ParamMap) =>
          this.todoService.getTodo(param.get('id')!)
        )
      )
      .subscribe(todo=>{
       this.editForm.setValue({
        id:todo?.id,
        todo:todo?.todo,
        completed:todo?.completed,
        userId:todo?.userId
       })
      })

  }

  get id(){
    return this.editForm.get('id') as FormControl;
  }
  get userId(){
    return this.editForm.get('userId') as FormControl;
  }

  get completed(){
    return this.editForm.get('completed') as FormControl;
  }

  get todo(){
    return this.editForm.get('todo') as FormControl;
  }

  saveTodo(){
     this._todo={id:this.id.value,todo:this.todo.value,completed:this.completed.value,userId:this.userId.value };
    this.todoService.editTodo(this._todo).subscribe(
       ()=> this.router.navigate(['/addtodo']),
       (err)=>{console.log(err)}
       );
    }
     
    }
 
