import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StatusProjetoService } from './status-projeto.service';

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


  displayedColumns: string[] = ['id', 'nome'];
  dataSource = new MatTableDataSource([]);
  loading: boolean;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private statusProjetoService: StatusProjetoService) {
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


}
