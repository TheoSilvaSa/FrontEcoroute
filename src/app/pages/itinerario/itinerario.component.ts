import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html'
})
export class ItinerarioComponent implements OnInit {
  
  rotasSalvas: any[] = [];
  
  todosCaminhoes: any[] = [];
  caminhoesCompativeis: any[] = [];
  itinerariosAgendados: any[] = [];
  dataMinima: Date = new Date();
  
  novoAgendamento: any = {
    rotaId: null,
    caminhaoId: null,
    dataAgendada: null,
    status: 'PENDENTE'
  };

  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() {
    this.carregarDadosBase();
    this.carregarAgenda();
    this.dataMinima.setHours(0, 0, 0, 0);
  }

  carregarDadosBase() {
    this.api.listarRotasSalvas().subscribe(rotas => this.rotasSalvas = rotas);
    this.api.listarCaminhoes().subscribe(caminhoes => this.todosCaminhoes = caminhoes);
  }

  carregarAgenda() {
    this.api.listarItinerarios().subscribe(agenda => this.itinerariosAgendados = agenda);
  }

  aoSelecionarRota() {
    this.novoAgendamento.caminhaoId = null;
    this.caminhoesCompativeis = [];

    if (!this.novoAgendamento.rotaId) return;

    const rotaSelecionada = this.rotasSalvas.find(r => r.id === this.novoAgendamento.rotaId);

    if (rotaSelecionada && rotaSelecionada.tiposResiduosAtendidos) {
        const requisitosRota = rotaSelecionada.tiposResiduosAtendidos
            .split(',')
            .map((s: string) => s.trim());

        this.caminhoesCompativeis = this.todosCaminhoes.filter(caminhao => {
            if (!caminhao.residuosSuportados) return false;

            const capacidadesCaminhao = caminhao.residuosSuportados
                .split(',')
                .map((s: string) => s.trim());

            return requisitosRota.every((req: string) => capacidadesCaminhao.includes(req));
        });

        if (this.caminhoesCompativeis.length === 0) {
            this.msg.add({
                severity: 'warn', 
                summary: 'Aviso', 
                detail: `Nenhum caminhão apto para: ${rotaSelecionada.tiposResiduosAtendidos}.`
            });
        }
    }
  }

  salvarItinerario() {
    if (!this.novoAgendamento.rotaId || !this.novoAgendamento.caminhaoId || !this.novoAgendamento.dataAgendada) {
      this.msg.add({severity:'warn', summary:'Atenção', detail: 'Preencha Rota, Caminhão e Data.'});
      return;
    }

    let dataFormatada = this.novoAgendamento.dataAgendada;
    if (this.novoAgendamento.dataAgendada instanceof Date) {
        dataFormatada = this.novoAgendamento.dataAgendada.toISOString().split('T')[0];
    }

    const rotaObj = this.rotasSalvas.find(r => r.id === this.novoAgendamento.rotaId);
    const nomeRota = rotaObj ? rotaObj.nome : 'Rota Manual';

    const payload = {
        caminhao: { id: this.novoAgendamento.caminhaoId },
        rotaDescricao: nomeRota,
        dataAgendada: dataFormatada,
        status: 'PENDENTE'
    };

    this.api.agendarItinerario(payload).subscribe({
      next: () => {
        this.msg.add({severity:'success', summary:'Sucesso', detail: 'Itinerário agendado!'});
        this.novoAgendamento = { rotaId: null, caminhaoId: null, dataAgendada: null, status: 'PENDENTE' };
        this.caminhoesCompativeis = [];
        this.carregarAgenda();
      },
      error: (err) => {
        const msgErro = err.error?.erro || err.error?.message || 'Erro ao agendar.';
        this.msg.add({severity:'error', summary:'Falha', detail: msgErro});
      }
    });
  }
  
  deletarItinerario(id: number) {
     if(confirm('Cancelar este agendamento?')) {
        this.api.deletarItinerario(id).subscribe(() => this.carregarAgenda());
     }
  }
}