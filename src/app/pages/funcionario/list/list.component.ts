import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from '../../../components/confirm-delete/confirm-delete.component';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dialogRef;
  displayedColumns: string[] = ['nome', 'cpf', 'data_nascimento', 'excluir'];
  dataSource = new MatTableDataSource([]);
  loading: boolean;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private funcionarioService: FuncionarioService,
    public dialog: MatDialog,
    private snackbarService: MatSnackBar
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.listar();
  }

  async listar() {
    this.loading = true;
    await this.funcionarioService.getFuncionario().then((res: any[]) => {
      setTimeout(() => {
        this.dataSource.data = res;
        this.loading = false;
      }, 1000);
    });
  }

  openDialog(data: any) {
    this.dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        nome: data.nome,
      }
    });
    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.funcionarioService.deleteFuncionario(data._id).then(
          () => {
            this.snackbarService.open('Excluído com sucesso!', 'OK', {
              horizontalPosition: 'center',
              duration: 4000,
            });
            this.listar();
          }
        );
      }
    });
  }

  excluir(event: Event, tipoProjeto: any) {
    event.stopPropagation();
    this.openDialog(tipoProjeto);
  }
}
