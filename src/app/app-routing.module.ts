import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent as TipoProjetoList } from './pages/tipo-projeto/list/list.component';
import { FormComponent as TipoProjetoForm } from './pages/tipo-projeto/form/form.component';
import { ListComponent as StatusProjetoList } from './pages/status-projeto/list/list.component';
import { FormComponent as StatusProjectForm } from './pages/status-projeto/form/form.component';
import { ListComponent as CargoList } from './pages/cargo/list/list.component';
import { FormComponent as CargoForm } from './pages/cargo/form/form.component';
import { ListComponent as FuncionarioList } from './pages/funcionario/list/list.component';
import { FormComponent as FuncionarioForm } from './pages/funcionario/form/form.component';
import { ListComponent as ProjetoList } from './pages/projeto/list/list.component';
import { FormComponent as ProjetoForm } from './pages/projeto/form/form.component';

const routes: Routes = [
  { path: 'tipo-projeto', component: TipoProjetoList, data: {title: 'Tipo projeto'} },
  { path: 'tipo-projeto/novo', component: TipoProjetoForm, data: {title: 'Tipo projeto'} },
  { path: 'tipo-projeto/:id', component: TipoProjetoForm, data: {title: 'Tipo projeto'} },
  { path: 'status-projeto', component: StatusProjetoList, data: {title: 'Status projeto'} },
  { path: 'status-projeto/novo', component: StatusProjectForm, data: {title: 'Status projeto'} },
  { path: 'status-projeto/:id', component: StatusProjectForm, data: {title: 'Status projeto'} },
  { path: 'cargo', component: CargoList, data: {title: 'Cargo'} },
  { path: 'cargo/novo', component: CargoForm, data: {title: 'Cargo'} },
  { path: 'cargo/:id', component: CargoForm, data: {title: 'Cargo'} },
  { path: 'funcionario', component: FuncionarioList, data: {title: 'Funcionário'} },
  { path: 'funcionario/novo', component: FuncionarioForm, data: {title: 'Funcionário'} },
  { path: 'funcionario/:id', component: FuncionarioForm, data: {title: 'Funcionário'} },
  { path: 'projeto', component: ProjetoList, data: {title: 'Projeto'} },
  { path: 'projeto/novo', component: ProjetoForm, data: {title: 'Projeto'} },
  { path: 'projeto/:id', component: ProjetoForm, data: {title: 'Projeto'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
