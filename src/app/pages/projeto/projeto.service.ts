import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private httpCliente: HttpClient) { }
  getProjeto() {
    return this.httpCliente.get(`${environment.baseUrl}/projeto`).toPromise();
  }

  getOneProjeto(id: string) {
    return this.httpCliente.get(`${environment.baseUrl}/projeto/${id}`).toPromise();
  }

  postProjeto(data) {
    return this.httpCliente.post(`${environment.baseUrl}/projeto`, {
      ...data,
    }).toPromise();
  }

  putProjeto(id:string, data) {
    return this.httpCliente.put(`${environment.baseUrl}/projeto/${id}`, {
      ...data
    }).toPromise();
  }

  deleteProjeto(id: string) {
    return this.httpCliente.request('DELETE', `${environment.baseUrl}/projeto`, {body: {id}}).toPromise();
  }
}
