import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html'
})
export class ItinerarioComponent implements OnInit {
  
  rotasSalvas: any[] = [];
  caminhoesDisponiveis: any[] = [];
  itinerariosAgendados: any[] = [];
  
  // Variável para armazenar o resultado da rota (usada na visualização da sequência)
  rotaCalculada: any = null; 
  
  // Objeto para o novo agendamento
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
  }

  carregarDadosBase() {
    // Carrega rotas e caminhões para os dropdowns
    this.api.listarRotasSalvas().subscribe(rotas => this.rotasSalvas = rotas);
    this.api.listarCaminhoes().subscribe(caminhoes => this.caminhoesDisponiveis = caminhoes);
  }

  carregarAgenda() {
    // Lista os itinerários já agendados para a visualização
    this.api.listarItinerarios().subscribe(agenda => this.itinerariosAgendados = agenda);
  }

  salvarItinerario() {
    // Validação básica do Front-end
    if (!this.novoAgendamento.rotaId || !this.novoAgendamento.caminhaoId || !this.novoAgendamento.dataAgendada) {
      this.msg.add({severity:'warn', summary:'Atenção', detail: 'Preencha Rota, Caminhão e Data.'});
      return;
    }

    // A data precisa ser formatada para o padrão YYYY-MM-DD que o Backend Java (JSON) espera
    const dataFormatada = this.novoAgendamento.dataAgendada.toISOString().split('T')[0];
    const dataParaEnvio = { 
        ...this.novoAgendamento, 
        dataAgendada: dataFormatada 
    };

    // O Backend Java deve validar a regra: 'Um caminhão não pode ter dois itinerários no mesmo dia' [cite: 118]
    this.api.agendarItinerario(dataParaEnvio).subscribe({
      next: () => {
        this.msg.add({severity:'success', summary:'Sucesso', detail: 'Itinerário agendado!'});
        // Limpa o formulário e recarrega a agenda
        this.novoAgendamento = { rotaId: null, caminhaoId: null, dataAgendada: null, status: 'PENDENTE' };
        this.carregarAgenda();
      },
      error: (err) => {
        // Exibe erro do Backend (Ex: sobreposição de agenda) [cite: 140]
        this.msg.add({severity:'error', summary:'Falha', detail: err.error.message || 'Erro ao agendar.'});
      }
    });
  }
}