import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StatusProjetoService } from '../status-projeto.service';
import { ConfirmDeleteComponent } from '../../../components/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface StatusProjeto {
  nome: string;
  id: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit {

  dialogRef;
  displayedColumns: string[] = ['id', 'nome', 'excluir'];
  dataSource = new MatTableDataSource([]);
  loading: boolean;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private statusProjetoService: StatusProjetoService,
    public dialog: MatDialog,
    private snackbarService: MatSnackBar
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.listar();
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async listar() {
    this.loading = true;
    await this.statusProjetoService.getStatusProjeto().then((res: StatusProjeto[]) => {
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
        this.statusProjetoService.deleteTipoProjeto(statusProjeto._id).then(
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
