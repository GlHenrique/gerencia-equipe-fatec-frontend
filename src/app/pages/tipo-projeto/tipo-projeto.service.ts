import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoProjetoService {

  constructor(private httpClient: HttpClient) {}

  getTipoProjeto() {
    return this.httpClient.get(`${environment.baseUrl}/tipo-projeto`).toPromise();
  }

  getOneTipoProjeto(id: string) {
    return this.httpClient.get(`${environment.baseUrl}/tipo-projeto/${id}`).toPromise();
  }

  postTipoProjeto(nome: string) {
    return this.httpClient.post(`${environment.baseUrl}/tipo-projeto`, {
      nome,
    }).toPromise();
  }

  putTipoProjeto(id:string, nome: string) {
    return this.httpClient.put(`${environment.baseUrl}/tipo-projeto/${id}`, {
      nome,
    }).toPromise();
  }

  deleteTipoProjeto(id: string) {
    return this.httpClient.request('DELETE', `${environment.baseUrl}/tipo-projeto`, {body: {id}}).toPromise();
  }
}
