import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent implements OnInit {
  id!:string;
  isDeleted!:boolean;
  constructor(
    private ts:TodoService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>this.id = param.get('id')!);
      this.ts.deleteTodo(this.id)
      .subscribe(()=>{
        this.isDeleted=true;
        this.router.navigate(['../../todo']);
      })
  }

}
