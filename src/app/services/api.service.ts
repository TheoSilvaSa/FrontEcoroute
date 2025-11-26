import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; // Conecta no Java

  constructor(private http: HttpClient) { }

  // Auth
  login(credenciais: any): Observable<any> { return this.http.post(`${this.baseUrl}/login`, credenciais); }

  // Caminhões (CRUD)
  listarCaminhoes(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/caminhoes`); }
  salvarCaminhao(obj: any): Observable<any> {
    if (obj.id) return this.http.put(`${this.baseUrl}/caminhoes/${obj.id}`, obj);
    return this.http.post(`${this.baseUrl}/caminhoes`, obj);
  }
  deletarCaminhao(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/caminhoes/${id}`); }

  // Pontos de Coleta (CRUD)
  listarPontos(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/pontos-coleta`); }
  salvarPonto(obj: any): Observable<any> {
    if (obj.id) return this.http.put(`${this.baseUrl}/pontos-coleta/${obj.id}`, obj);
    return this.http.post(`${this.baseUrl}/pontos-coleta`, obj);
  }
  deletarPonto(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/pontos-coleta/${id}`); }

  // Grafo e Roteamento (Dijkstra)
  listarBairros(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/bairros`); } 
  listarRuas(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/ruas`); }
  
  calcularRota(origemId: number, destinoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/rota?origemId=${origemId}&destinoId=${destinoId}`);
  }

  // 💡 CORRIGIDO: ROTAS SALVAS (CRUD)
  listarRotasSalvas(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/rotas`); }
  
  // MÉTODO FALTANTE ADICIONADO: Salva a rota calculada
  salvarRotaCalculada(rota: any): Observable<any> { return this.http.post(`${this.baseUrl}/rotas`, rota); }
  
  // MÉTODO FALTANTE ADICIONADO: Deleta uma rota salva
  deletarRota(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/rotas/${id}`); }

  // Itinerários (Agendamento)
  listarItinerarios(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/itinerarios`); }
  agendarItinerario(itinerarioData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/itinerarios`, itinerarioData);
  }

  // MÉTODO DE CÁLCULO DE ITINERÁRIO (Múltiplas paradas - Simulação)
  calcularItinerario(idsBairros: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/itinerario/calcular`, idsBairros);
  }
}