import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({ 
  selector: 'app-dashboard', 
  templateUrl: './dashboard.component.html' 
})
export class DashboardComponent implements OnInit {
  origem: number = 2; 
  destino: number | null = null;
  resultado: any = null;

  bairros: any[] = [];

  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() {
    this.carregarBairros();
  }

  carregarBairros() {
    this.api.listarBairros().subscribe({
      next: (data) => {
        this.bairros = data;
      },
      error: (err) => {
        this.msg.add({severity:'error', summary:'Erro', detail: 'Não foi possível carregar os bairros.'});
        console.error(err);
      }
    });
  }

  calcular() {
    if (!this.origem || !this.destino) {
        this.msg.add({severity:'warn', summary:'Atenção', detail:'Informe o ID de Origem e Destino'});
        return;
    }
    
    this.api.calcularRota(this.origem, this.destino).subscribe({
      next: (res) => {
        this.resultado = res;
        if (res.erro) {
           this.msg.add({severity:'error', summary:'Erro de Rota', detail: res.erro});
        }
      },
      error: (err) => {
        this.msg.add({severity:'error', summary:'Erro', detail: 'Falha ao calcular rota.'});
      }
    });
  }
}