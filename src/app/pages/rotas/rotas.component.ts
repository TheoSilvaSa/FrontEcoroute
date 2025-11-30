import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.component.html'
})
export class RotasComponent implements OnInit {

  rotasSalvas: any[] = [];
  caminhoesDisponiveis: any[] = []; // Para o Dropdown
  
  origemId: number | null = null;
  destinoId: number | null = null;
  rotaCalculada: any = null; 
  
  nomeNovaRota: string = '';
  caminhaoSelecionadoId: number | null = null; // ID do caminhão
  
  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() {
    this.carregarRotasSalvas();
    // 💡 NOVO: Carrega caminhões ao iniciar o componente
    this.api.listarCaminhoes().subscribe(data => this.caminhoesDisponiveis = data); 
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
        this.nomeNovaRota = `Rota ${res.caminho[0]} para ${res.caminho[res.caminho.length - 1]}`;
      },
      error: (err) => {
        this.msg.add({severity:'error', summary:'Erro', detail: err.error?.erro || 'Falha ao calcular rota.'});
      }
    });
  }

  salvarRota() {
    if (!this.nomeNovaRota || !this.rotaCalculada || !this.caminhaoSelecionadoId) {
      this.msg.add({severity:'warn', summary:'Atenção', detail:'Preencha todos os campos e calcule a rota.'});
      return;
    }

    // 💡 PASSO CRÍTICO: Busca o objeto Caminhão para obter a placa e os Tipos de Resíduo
    const caminhaoDesignado = this.caminhoesDisponiveis.find(c => c.id === this.caminhaoSelecionadoId);
    
    // Atribuição automática dos resíduos suportados pelo caminhão
    const tiposResiduos = caminhaoDesignado ? caminhaoDesignado.residuosSuportados : '';
    
    if (!tiposResiduos) {
         this.msg.add({severity:'error', summary:'Erro', detail:'O caminhão designado não tem Tipos de Resíduos definidos (campo vazio).'});
         return;
    }
    
    const novaRota = {
      nome: this.nomeNovaRota,
      distanciaTotal: this.rotaCalculada.distanciaTotal,
      sequenciaBairros: this.rotaCalculada.caminho,
      // 💡 CAMPOS EXIGIDOS
      tiposResiduosAtendidos: tiposResiduos, // Preenchido automaticamente!
      caminhaoDesignadoPlaca: caminhaoDesignado ? caminhaoDesignado.placa : 'N/A' 
    };

    this.api.salvarRotaCalculada(novaRota).subscribe({
      next: () => {
        this.msg.add({severity:'success', summary:'Sucesso', detail:'Rota salva para agendamento!'});
        this.rotaCalculada = null;
        this.nomeNovaRota = '';
        this.caminhaoSelecionadoId = null;
        this.carregarRotasSalvas();
      },
      error: () => this.msg.add({severity:'error', summary:'Erro', detail:'Falha ao salvar.'})
    });
  }
  
  deletarRota(id: number) {
     if(confirm('Tem certeza que deseja excluir esta rota?')) {
        this.api.deletarRota(id).subscribe(() => {
            this.msg.add({severity:'success', summary:'Sucesso', detail:'Rota deletada.'});
            this.carregarRotasSalvas();
        });
     }
  }
}