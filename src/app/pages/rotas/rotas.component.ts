import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.component.html'
})
export class RotasComponent implements OnInit {

  rotasSalvas: any[] = [];
  bairros: any[] = [];
  
  tiposResiduosOpcoes: any[] = [
      { label: 'Plástico', value: 'Plástico' },
      { label: 'Metal', value: 'Metal' },
      { label: 'Papel', value: 'Papel' },
      { label: 'Orgânico', value: 'Orgânico' }
  ];

  origemId: number = 2;
  destinoId: number | null = null;
  
  rotaCalculada: any = null; 
  nomeNovaRota: string = '';
  
  tipoResiduoSelecionado: string[] = [];

  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.api.listarRotasSalvas().subscribe(data => this.rotasSalvas = data);
    
    this.api.listarBairros().subscribe(data => this.bairros = data);
  }

  calcularEExibir() {
    if (!this.origemId || !this.destinoId) {
      this.msg.add({severity:'warn', summary:'Atenção', detail:'Selecione Origem e Destino.'});
      return;
    }
    
    this.api.calcularRota(this.origemId, this.destinoId).subscribe({
      next: (res) => {
        this.rotaCalculada = res;
        
        const bairroDestino = this.bairros.find(b => b.id === this.destinoId);
        const nomeDestino = bairroDestino ? bairroDestino.nome : 'Destino';
        
        this.nomeNovaRota = `Rota para ${nomeDestino}`;
      },
      error: (err) => {
        this.msg.add({severity:'error', summary:'Erro', detail: err.error?.erro || 'Falha ao calcular rota.'});
      }
    });
  }

  salvarRota() {
    if (!this.nomeNovaRota || !this.rotaCalculada || this.tipoResiduoSelecionado.length === 0) {
      this.msg.add({severity:'warn', summary:'Atenção', detail:'Preencha o nome e selecione pelo menos um tipo de resíduo.'});
      return;
    }

    const novaRota = {
      nome: this.nomeNovaRota,
      distanciaTotal: this.rotaCalculada.distanciaTotal,
      sequenciaBairros: this.rotaCalculada.caminho,
      tiposResiduosAtendidos: this.tipoResiduoSelecionado.join(', '), 
      caminhaoDesignadoPlaca: "A Definir" 
    };

    this.api.salvarRotaCalculada(novaRota).subscribe({
      next: () => {
        this.msg.add({severity:'success', summary:'Sucesso', detail:'Rota definida com sucesso!'});
        
        this.rotaCalculada = null;
        this.nomeNovaRota = '';
        this.destinoId = null;
        this.tipoResiduoSelecionado = [];
        
        this.carregarDados();
      },
      error: () => this.msg.add({severity:'error', summary:'Erro', detail:'Falha ao salvar rota.'})
    });
  }

  deletarRota(id: number) {
     if(confirm('Deseja excluir esta rota?')) {
        this.api.deletarRota(id).subscribe(() => {
            this.msg.add({severity:'success', summary:'Sucesso', detail:'Rota excluída.'});
            this.carregarDados();
        });
     }
  }
}