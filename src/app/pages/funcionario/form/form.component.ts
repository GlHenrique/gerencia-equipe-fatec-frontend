import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../funcionario.service';
import { CargoService } from '../../cargo/cargo.service';
import { Form, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  info: any;
  idFuncionario: string;
  cargos: any;
  supervisores: any[];
  cargoSupervisor: string;
  hoje: Date;
  constructor(
    private funcionarioService: FuncionarioService,
    private cargoService: CargoService,
    private snackbarService: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.info = {};
    this.cargoSupervisor = '';
    this.supervisores = [];
    this.hoje = new Date();
    this.idFuncionario = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.buscarCargo();
    this.buscarFuncionarios();
    if (this.idFuncionario) {
      this.buscarFuncionario();
    }
  }

  back() {
    this.router.navigate(['/funcionario']);
  }

  buscarCargo() {
    this.cargoService.getCargo().then((res: any) => {
      this.cargos = res;
      this.cargoSupervisor = res.filter((cargo) => cargo.nome === 'Supervisor')[0]._id;
    });
  }

  changeCargo() {
    if (this.info.cargo === this.cargoSupervisor) {
      delete this.info.supervisor;
    }
  }

  buscarFuncionario() {
    this.funcionarioService.getOneFuncionario(this.idFuncionario).then((res: any) => {
      this.info = res;
      this.info.cargo = res.cargo._id;
      this.info.supervisor = res.supervisor;
    });
  }

  buscarFuncionarios() {
    this.funcionarioService.getFuncionario().then((res: any) => {
      this.supervisores = res.filter((funcionario) => funcionario.cargo.nome === 'Supervisor');
    });
  }

  verificaSupervisor() {
    console.log(this.info)
  }

  submit(e: Event, form: NgForm) {
    e.preventDefault();
    if (form.invalid) {
      return;
    }
    if (!this.info) {
      return;
    }
    if (this.idFuncionario) {
      this.funcionarioService.putFuncionario(this.idFuncionario, this.info).then(() => this.snackbarService.open('Atualizado com sucesso!', 'OK', {
        horizontalPosition: 'center',
        duration: 4000,
      })).then(() => this.router.navigate(['/funcionario']));
      return;
    }
    this.funcionarioService.postFuncionario(this.info).then(() => this.snackbarService.open('Cadastrado com sucesso!', 'OK', {
      horizontalPosition: 'center',
      duration: 4000,
    })).then(() => this.router.navigate(['/funcionario']));


  }
}
