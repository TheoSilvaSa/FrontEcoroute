import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  login(credenciais: any): Observable<any> { return this.http.post(`${this.baseUrl}/login`, credenciais); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, usuario);
  }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  listarCaminhoes(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/caminhoes`); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  salvarCaminhao(obj: any): Observable<any> {
    if (obj.id) return this.http.put(`${this.baseUrl}/caminhoes/${obj.id}`, obj);
    return this.http.post(`${this.baseUrl}/caminhoes`, obj);
  }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  deletarCaminhao(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/caminhoes/${id}`); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  listarPontos(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/pontos-coleta`); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  salvarPonto(obj: any): Observable<any> {
    if (obj.id) return this.http.put(`${this.baseUrl}/pontos-coleta/${obj.id}`, obj);
    return this.http.post(`${this.baseUrl}/pontos-coleta`, obj);
  }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  deletarPonto(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/pontos-coleta/${id}`); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  listarBairros(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/bairros`); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  listarRuas(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/ruas`); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  calcularRota(origemId: number, destinoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/rota?origemId=${origemId}&destinoId=${destinoId}`);
  }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  listarRotasSalvas(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/rotas`); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  salvarRotaCalculada(rota: any): Observable<any> { return this.http.post(`${this.baseUrl}/rotas`, rota); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  deletarRota(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/rotas/${id}`); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  listarItinerarios(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/itinerarios`); }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  agendarItinerario(itinerarioData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/itinerarios`, itinerarioData);
  }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  deletarItinerario(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/itinerarios/${id}`);
  }

  // OBSERVABLE
  // Monitarando/Observando o retorno da API após a execução da requisição HTTP abaixo
  calcularItinerario(idsBairros: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/itinerario/calcular`, idsBairros);
  }
}
