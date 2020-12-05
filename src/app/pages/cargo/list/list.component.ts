import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StatusProjetoService } from '../../status-projeto/status-projeto.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from '../../../components/confirm-delete/confirm-delete.component';
import { StatusProjeto } from '../../status-projeto/list/list.component';
import { CargoService } from '../cargo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dialogRef;
  displayedColumns: string[] = ['id', 'nome', 'excluir'];
  dataSource = new MatTableDataSource([]);
  loading: boolean;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cargoService: CargoService,
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
    await this.cargoService.getCargo().then((res: StatusProjeto[]) => {
      setTimeout(() => {
        this.dataSource.data = res;
        this.loading = false;
      }, 1000);
    });
  }

  openDialog(statusProjeto: any) {
    this.dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        nome: statusProjeto.nome,
      }
    });
    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.cargoService.deleteCargo(statusProjeto._id).then(
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
