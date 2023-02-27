import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { DeleteTodoComponent } from './delete-todo/delete-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { AuthGuard } from '../auth/auth.guard';
import { TodoDashboardComponent } from './todo-dashboard/todo-dashboard.component';
const routes: Routes = [
    {
      path:'',
      component:TodoDashboardComponent,
      canActivate:[AuthGuard],
       children:[
              {path:'todoList',component:TodoListComponent},
              {path:'addTodo',component:AddTodoComponent},
              {path:'delete/:id',component:DeleteTodoComponent},
              {path:'edit/:id',component:EditTodoComponent}
     ]}
      ];
       

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TodosRoutingModule { }