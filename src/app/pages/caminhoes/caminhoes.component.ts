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

  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() { this.carregar(); }
  carregar() { this.api.listarCaminhoes().subscribe(d => this.lista = d); }
  
  abrirModal(item?: any) {
    this.caminhao = item ? { ...item } : {}; // Para edição ou novo
    this.modalAberto = true;
  }

  salvar() {
    this.api.salvarCaminhao(this.caminhao).subscribe({
      next: () => {
        this.modalAberto = false;
        this.carregar();
        this.msg.add({severity:'success', summary:'Salvo!', detail: 'Caminhão atualizado.'});
      },
      error: (err) => {
        // Exibe erro de validação (ex: Regex de Placa)
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