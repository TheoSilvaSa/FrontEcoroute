import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({ 
  selector: 'app-dashboard', 
  templateUrl: './dashboard.component.html' 
})
export class DashboardComponent {
  origem: number = 0; 
  destino: number = 0; 
  resultado: any = null;

  constructor(private api: ApiService, private msg: MessageService) {}

  calcular() {
    if (!this.origem || !this.destino) {
        this.msg.add({severity:'warn', summary:'Atenção', detail:'Informe o ID de Origem e Destino'});
        return;
    }
    
    // Chama o serviço que executa o Dijkstra no Backend Java
    this.api.calcularRota(this.origem, this.destino).subscribe(res => {
      this.resultado = res;
      if (res.erro) { // Se o Backend retornou erro (ex: caminho não encontrado)
         this.msg.add({severity:'error', summary:'Erro de Rota', detail: res.erro});
      }
    });
  }
}