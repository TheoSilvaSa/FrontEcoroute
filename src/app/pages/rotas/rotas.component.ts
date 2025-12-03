import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.component.html'
})
export class RotasComponent implements OnInit {

  rotasSalvas: any[] = [];
  
  tiposResiduosOpcoes: any[] = [
      { label: 'Plástico', value: 'Plástico' },
      { label: 'Papel', value: 'Papel' },
      { label: 'Metal', value: 'Metal' },
      { label: 'Orgânico', value: 'Orgânico' }
  ];

  origemId: number = 2; 
  destinoId: number | null = null;
  
  rotaCalculada: any = null; 
  nomeNovaRota: string = '';
  tipoResiduoSelecionado: string = '';

  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() {
    this.carregarRotasSalvas();
  }

  carregarRotasSalvas() {
    this.api.listarRotasSalvas().subscribe(data => this.rotasSalvas = data);
  }

  calcularEExibir() {
    if (!this.origemId || !this.destinoId) {
      this.msg.add({severity:'warn', summary:'Atenção', detail:'Informe Origem e Destino.'});
      return;
    }
    
    this.api.calcularRota(this.origemId, this.destinoId).subscribe({
      next: (res) => {
        this.rotaCalculada = res;
        this.nomeNovaRota = `Rota para ${res.caminho[res.caminho.length - 1]}`;
      },
      error: (err) => {
        this.msg.add({severity:'error', summary:'Erro', detail: err.error?.erro || 'Falha ao calcular rota.'});
      }
    });
  }

  salvarRota() {
    if (!this.nomeNovaRota || !this.rotaCalculada || !this.tipoResiduoSelecionado) {
      this.msg.add({severity:'warn', summary:'Atenção', detail:'Preencha o nome e selecione o tipo de resíduo.'});
      return;
    }

    const novaRota = {
      nome: this.nomeNovaRota,
      distanciaTotal: this.rotaCalculada.distanciaTotal,
      sequenciaBairros: this.rotaCalculada.caminho,
      tiposResiduosAtendidos: this.tipoResiduoSelecionado, 
      caminhaoDesignadoPlaca: "A Definir" 
    };

    this.api.salvarRotaCalculada(novaRota).subscribe({
      next: () => {
        this.msg.add({severity:'success', summary:'Sucesso', detail:'Rota definida com sucesso!'});
        this.rotaCalculada = null;
        this.nomeNovaRota = '';
        this.tipoResiduoSelecionado = '';
        this.carregarRotasSalvas();
      },
      error: () => this.msg.add({severity:'error', summary:'Erro', detail:'Falha ao salvar rota.'})
    });
  }

  deletarRota(id: number) {
     if(confirm('Deseja excluir esta rota?')) {
        this.api.deletarRota(id).subscribe(() => {
            this.msg.add({severity:'success', summary:'Sucesso', detail:'Rota excluída.'});
            this.carregarRotasSalvas();
        });
     }
  }
}