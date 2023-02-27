import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { DeleteTodoComponent } from './delete-todo/delete-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { TodoDashboardComponent } from './todo-dashboard/todo-dashboard.component';

@NgModule({
  declarations: [
    TodoListComponent,
    AddTodoComponent,
    DeleteTodoComponent,
    EditTodoComponent,
    TodoDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodosRoutingModule,
   ],
  exports:[TodoListComponent,AddTodoComponent,DeleteTodoComponent,EditTodoComponent,TodoDashboardComponent]
})
export class TodoListModule { }
