import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private httpCliente: HttpClient) { }
  getCargo() {
    return this.httpCliente.get(`${environment.baseUrl}/cargo`).toPromise();
  }

  getOneCargo(id: string) {
    return this.httpCliente.get(`${environment.baseUrl}/cargo/${id}`).toPromise();
  }

  postCargo(nome: string) {
    return this.httpCliente.post(`${environment.baseUrl}/cargo`, {
      nome,
    }).toPromise();
  }

  putCargo(id:string, nome: string) {
    return this.httpCliente.put(`${environment.baseUrl}/cargo/${id}`, {
      nome,
    }).toPromise();
  }

  deleteCargo(id: string) {
    return this.httpCliente.request('DELETE', `${environment.baseUrl}/cargo`, {body: {id}}).toPromise();
  }
}
