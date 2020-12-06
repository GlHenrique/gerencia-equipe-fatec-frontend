import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { CargoService } from '../../cargo/cargo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TipoProjetoService } from '../../tipo-projeto/tipo-projeto.service';
import { ProjetoService } from '../projeto.service';
import { StatusProjetoService } from '../../status-projeto/status-projeto.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  info: any;
  idProjeto: string;
  cargos: any;
  supervisores: any[];
  lideres: any[];
  integrantes: any[];
  tiposProjetos: any[];
  statusProjetos: any[];
  cargoSupervisor: string;
  hoje: Date;
  constructor(
    private funcionarioService: FuncionarioService,
    private tiposProjetoService: TipoProjetoService,
    private projetoService: ProjetoService,
    private statusProjetoService: StatusProjetoService,
    private snackbarService: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.info = {};
    this.cargoSupervisor = '';
    this.supervisores = [];
    this.lideres = [];
    this.integrantes = [];
    this.tiposProjetos = [];
    this.statusProjetos = [];
    this.hoje = new Date();
    this.idProjeto = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.buscarFuncionarios();
    this.buscarTiposProjeto();
    this.buscarStatusProjetos();
    this.buscarProjeto();
  }

  back() {
    this.router.navigate(['/projeto']);
  }

  buscarProjeto() {
    if (this.idProjeto) {
      this.projetoService.getOneProjeto(this.idProjeto).then(
        (res: any) => {
          this.info = res;
        }
      );
    }
  }

  buscarFuncionarios() {
    this.funcionarioService.getFuncionario().then((res: any) => {
      this.supervisores = res.filter((funcionario) => funcionario.cargo.nome === 'Supervisor');
      this.lideres = res.filter((funcionario) => funcionario.cargo.nome === 'Líder');
      this.integrantes = res.filter((funcionario) => (
        funcionario.cargo.nome !== 'Líder' && funcionario.cargo.nome !== 'Supervisor'
      ));
    });
  }

  buscarStatusProjetos() {
    this.statusProjetoService.getStatusProjeto().then(
      (res: any) => {
        this.statusProjetos = res;
      }
    );
  }

  buscarTiposProjeto() {
    this.tiposProjetoService.getTipoProjeto().then(
      (res: any) => {
        this.tiposProjetos = res;
      }
    );
  }

  setStatusProjeto(selected) {
    this.info.status = selected._id;
  }

  submit(e: Event, form: NgForm) {
    e.preventDefault();
    if (form.invalid) {
      return;
    }
    if (this.idProjeto) {
      this.projetoService.putProjeto(this.idProjeto, this.info).then(() => this.snackbarService.open('Atualizado com sucesso!', 'OK', {
        horizontalPosition: 'center',
        duration: 4000,
      })).then(() => this.router.navigate(['/projeto']));
      return;
    }
    this.projetoService.postProjeto(this.info).then(() => this.snackbarService.open('Cadastrado com sucesso!', 'OK', {
      horizontalPosition: 'center',
      duration: 4000,
    })).then(() => this.router.navigate(['/projeto']));


  }
}
