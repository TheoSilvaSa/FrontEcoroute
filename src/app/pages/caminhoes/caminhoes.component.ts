import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({ 
  selector: 'app-caminhoes', 
  templateUrl: './caminhoes.component.html' 
})
export class CaminhoesComponent implements OnInit {
  lista: any[] = [];
  caminhao: any = {};
  modalAberto = false;

  residuosSelecionados: string[] = [];

  tiposResiduosOpcoes: any[] = [
      { label: 'Plástico', value: 'Plástico' },
      { label: 'Metal', value: 'Metal' },
      { label: 'Papel', value: 'Papel' },
      { label: 'Orgânico', value: 'Orgânico' }
  ];

  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() { this.carregar(); }
  
  carregar() { 
    this.api.listarCaminhoes().subscribe(d => this.lista = d); 
  }
  
  abrirModal(item?: any) {
    this.caminhao = item ? { ...item } : {};

    if (this.caminhao.residuosSuportados) {
      this.residuosSelecionados = this.caminhao.residuosSuportados
        .split(',')
        .map((s: string) => s.trim());
    } else {
      this.residuosSelecionados = [];
    }

    this.modalAberto = true;
  }

  salvar() {
    if (this.residuosSelecionados && this.residuosSelecionados.length > 0) {
      this.caminhao.residuosSuportados = this.residuosSelecionados.join(', ');
    } else {
      this.caminhao.residuosSuportados = ''; 
    }

    this.api.salvarCaminhao(this.caminhao).subscribe({
      next: () => {
        this.modalAberto = false;
        this.carregar();
        this.msg.add({severity:'success', summary:'Salvo!', detail: 'Caminhão atualizado.'});
      },
      error: (err) => {
        this.msg.add({severity:'error', summary:'Erro', detail: err.error.message || 'Falha ao salvar'});
      }
    });
  }
  
  deletar(id: number) {
    if(confirm('Tem certeza que deseja excluir este caminhão?')) {
      this.api.deletarCaminhao(id).subscribe(() => {
        this.msg.add({severity:'success', summary:'Sucesso', detail:'Deletado'});
        this.carregar();
      });
    }
  }
}