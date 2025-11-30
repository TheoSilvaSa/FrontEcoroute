import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({ 
  selector: 'app-pontos', 
  templateUrl: './pontos.component.html' 
})
export class PontosComponent implements OnInit {
  lista: any[] = [];
  ponto: any = {};
  modalAberto = false;

  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() { this.carregar(); }
  carregar() { this.api.listarPontos().subscribe(d => this.lista = d); }
  
  abrirModal(item?: any) {
    this.ponto = item ? { ...item } : {};
    this.modalAberto = true;
  }

  salvar() {
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