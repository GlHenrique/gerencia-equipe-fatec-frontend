import { Component, OnInit } from '@angular/core';
import { StatusProjetoService } from '../status-projeto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  nome: string;
  idStatusProjeto: string;
  constructor(
    private statusProjetoService: StatusProjetoService,
    private snackbarService: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.nome = '';
    this.idStatusProjeto = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.idStatusProjeto) {
      this.buscarStatusProjeto();
    }
  }

  back() {
    this.router.navigate(['/status-projeto']);
  }

  buscarStatusProjeto() {
    this.statusProjetoService.getOneStatusProjeto(this.idStatusProjeto).then((res: any) => this.nome = res.nome);
  }

  submit(e: Event) {
    e.preventDefault();
    if (!this.nome) {
      return;
    }
    if (this.idStatusProjeto) {
      this.statusProjetoService.putStatusProjeto(this.idStatusProjeto, this.nome).then(() => this.snackbarService.open('Atualizado com sucesso!', 'OK', {
        horizontalPosition: 'center',
        duration: 4000,
      })).then(() => this.router.navigate(['/status-projeto']));
      return;
    }
    this.statusProjetoService.postStatusProjeto(this.nome).then(() => this.snackbarService.open('Cadastrado com sucesso!', 'OK', {
      horizontalPosition: 'center',
      duration: 4000,
    })).then(() => this.router.navigate(['/status-projeto']));


  }
}
