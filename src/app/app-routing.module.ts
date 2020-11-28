import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent as TipoProjetoList } from './pages/tipo-projeto/list/list.component';
import { FormComponent as TipoProjetoForm } from './pages/tipo-projeto/form/form.component';
import { ListComponent as StatusProjetoList } from './pages/status-projeto/list/list.component';
import { FormComponent as StatusProjectForm } from './pages/status-projeto/form/form.component';

const routes: Routes = [
  { path: 'tipo-projeto', component: TipoProjetoList, data: {title: 'Tipo projeto'} },
  { path: 'tipo-projeto/novo', component: TipoProjetoForm, data: {title: 'Tipo projeto'} },
  { path: 'tipo-projeto/:id', component: TipoProjetoForm, data: {title: 'Tipo projeto'} },
  { path: 'status-projeto', component: StatusProjetoList, data: {title: 'Status projeto'} },
  { path: 'status-projeto/novo', component: StatusProjectForm, data: {title: 'Status projeto'} },
  { path: 'status-projeto/:id', component: StatusProjectForm, data: {title: 'Status projeto'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
