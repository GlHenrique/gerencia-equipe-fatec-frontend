import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusProjetoService {

  constructor(private httpCliente: HttpClient) {}

  getStatusProjeto() {
    return this.httpCliente.get(`${environment.baseUrl}/status-projeto`).toPromise();
  }

  getOneStatusProjeto(id: string) {
    return this.httpCliente.get(`${environment.baseUrl}/status-projeto/${id}`).toPromise();
  }

  postStatusProjeto(nome: string) {
    return this.httpCliente.post(`${environment.baseUrl}/status-projeto`, {
      nome,
    }).toPromise();
  }

  putStatusProjeto(id:string, nome: string) {
    return this.httpCliente.put(`${environment.baseUrl}/status-projeto/${id}`, {
      nome,
    }).toPromise();
  }

  deleteTipoProjeto(id: string) {
    return this.httpCliente.request('DELETE', `${environment.baseUrl}/status-projeto`, {body: {id}}).toPromise();
  }
}
