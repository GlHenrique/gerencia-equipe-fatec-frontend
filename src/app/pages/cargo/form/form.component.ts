import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from '../cargo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  nome: string;
  idCargo: string;
  constructor(
    private cargoService: CargoService,
    private snackbarService: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.nome = '';
    this.idCargo = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.idCargo) {
      this.buscarCargo();
    }
  }

  back() {
    this.router.navigate(['/cargo']);
  }

  buscarCargo() {
    this.cargoService.getOneCargo(this.idCargo).then((res: any) => this.nome = res.nome);
  }

  submit(e: Event) {
    e.preventDefault();
    if (!this.nome) {
      return;
    }
    if (this.idCargo) {
      this.cargoService.putCargo(this.idCargo, this.nome).then(() => this.snackbarService.open('Atualizado com sucesso!', 'OK', {
        horizontalPosition: 'center',
        duration: 4000,
      })).then(() => this.router.navigate(['/cargo']));
      return;
    }
    this.cargoService.postCargo(this.nome).then(() => this.snackbarService.open('Cadastrado com sucesso!', 'OK', {
      horizontalPosition: 'center',
      duration: 4000,
    })).then(() => this.router.navigate(['/cargo']));


  }
}
