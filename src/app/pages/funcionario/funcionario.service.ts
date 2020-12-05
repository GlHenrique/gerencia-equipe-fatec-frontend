import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private httpCliente: HttpClient) { }
  getFuncionario() {
    return this.httpCliente.get(`${environment.baseUrl}/funcionario`).toPromise();
  }

  getOneFuncionario(id: string) {
    return this.httpCliente.get(`${environment.baseUrl}/funcionario/${id}`).toPromise();
  }

  postFuncionario(data) {
    return this.httpCliente.post(`${environment.baseUrl}/funcionario`, {
      ...data,
    }).toPromise();
  }

  putFuncionario(id:string, data) {
    return this.httpCliente.put(`${environment.baseUrl}/funcionario/${id}`, {
      ...data
    }).toPromise();
  }

  deleteFuncionario(id: string) {
    return this.httpCliente.request('DELETE', `${environment.baseUrl}/funcionario`, {body: {id}}).toPromise();
  }
}
