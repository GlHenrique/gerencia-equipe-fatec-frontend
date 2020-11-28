import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoProjetoService {

  constructor(private httpCliente: HttpClient) {}

  getTipoProjeto() {
    return this.httpCliente.get(`${environment.baseUrl}/tipo-projeto`).toPromise();
  }

  getOneTipoProjeto(id: string) {
    return this.httpCliente.get(`${environment.baseUrl}/tipo-projeto/${id}`).toPromise();
  }

  postTipoProjeto(nome: string) {
    return this.httpCliente.post(`${environment.baseUrl}/tipo-projeto`, {
      nome,
    }).toPromise();
  }

  putTipoProjeto(id:string, nome: string) {
    return this.httpCliente.put(`${environment.baseUrl}/tipo-projeto/${id}`, {
      nome,
    }).toPromise();
  }
}
