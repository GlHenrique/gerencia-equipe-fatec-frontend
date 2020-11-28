import { Component, OnInit } from '@angular/core';
import { TipoProjetoService } from '../tipo-projeto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  nome: string;
  idTipoProjeto: string;
  constructor(
    private tipoProjetoService: TipoProjetoService,
    private snackbarService: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.nome = '';
    this.idTipoProjeto = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.idTipoProjeto) {
      this.buscarTipoProjeto();
    }
  }

  back() {
    this.router.navigate(['/tipo-projeto']);
  }

  buscarTipoProjeto() {
    this.tipoProjetoService.getOneTipoProjeto(this.idTipoProjeto).then((res: any) => this.nome = res.nome);
  }

  submit(e: Event) {
    e.preventDefault();
    if (!this.nome) {
      return;
    }
    if (this.idTipoProjeto) {
      this.tipoProjetoService.putTipoProjeto(this.idTipoProjeto, this.nome).then(() => this.snackbarService.open('Atualizado com sucesso!', 'OK', {
        horizontalPosition: 'center',
        duration: 4000,
      })).then(() => this.router.navigate(['/tipo-projeto']));
      return;
    }
    this.tipoProjetoService.postTipoProjeto(this.nome).then(() => this.snackbarService.open('Cadastrado com sucesso!', 'OK', {
      horizontalPosition: 'center',
      duration: 4000,
    })).then(() => this.router.navigate(['/tipo-projeto']));


  }

}
