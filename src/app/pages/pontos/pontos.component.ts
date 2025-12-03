import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({ 
  selector: 'app-pontos', 
  templateUrl: './pontos.component.html' 
})
export class PontosComponent implements OnInit {
  lista: any[] = [];
  bairros: any[] = [];
  
  ponto: any = {};
  bairroSelecionadoId: number | null = null;
  
  modalAberto = false;

  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() { 
    this.carregar(); 
    this.carregarBairros();
  }
  
  carregar() { 
    this.api.listarPontos().subscribe(d => this.lista = d); 
  }

  carregarBairros() {
    this.api.listarBairros().subscribe(b => this.bairros = b);
  }
  
  abrirModal(item?: any) {
    this.ponto = item ? { ...item } : {};
    
    if (this.ponto.bairro && this.ponto.bairro.id) {
        this.bairroSelecionadoId = this.ponto.bairro.id;
    } else {
        this.bairroSelecionadoId = null;
    }
    
    this.modalAberto = true;
  }

  salvar() {
    if (!this.bairroSelecionadoId) {
        this.msg.add({severity:'warn', summary:'Atenção', detail: 'Selecione um bairro.'});
        return;
    }

    this.ponto.bairro = { id: this.bairroSelecionadoId };

    this.api.salvarPonto(this.ponto).subscribe({
      next: () => {
        this.modalAberto = false;
        this.carregar();
        this.msg.add({severity:'success', summary:'Salvo!', detail: 'Ponto atualizado.'});
      },
      error: (err) => {
        this.msg.add({severity:'error', summary:'Erro', detail: err.error.message || 'Falha ao salvar'});
      }
    });
  }
  
  deletar(id: number) {
    if(confirm('Tem certeza que deseja excluir este ponto de coleta?')) {
      this.api.deletarPonto(id).subscribe(() => {
        this.msg.add({severity:'success', summary:'Sucesso', detail:'Deletado'});
        this.carregar();
      });
    }
  }
}