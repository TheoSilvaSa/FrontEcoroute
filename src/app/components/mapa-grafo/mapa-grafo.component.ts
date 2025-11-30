import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Network, Data } from 'vis-network'; 
import { DataSet } from 'vis-data';

@Component({ 
  selector: 'app-mapa-grafo', 
  templateUrl: './mapa-grafo.component.html' 
})
export class MapaGrafoComponent implements OnInit, AfterViewInit {
  
  // 1. Referência o div do HTML para desenhar o grafo
  @ViewChild('networkContainer') networkContainerRef!: ElementRef;

  // Variáveis para guardar os dados
  private bairros: any[] = [];
  private ruas: any[] = [];
  private pontos: any[] = [];
  private dadosCarregados: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.carregarDados();
  }

  // 2. Garante que o elemento HTML foi renderizado antes de desenhar
  ngAfterViewInit() {
    // Se os dados já chegaram do backend, desenha agora
    if (this.dadosCarregados) {
      this.desenhar(this.bairros, this.ruas, this.pontos);
    }
  }

  carregarDados() {
    // Busca todos os dados necessários para o grafo (Nós, Arestas e Coletas)
    this.api.listarBairros().subscribe(bairros => {
      this.bairros = bairros;
      this.api.listarRuas().subscribe(ruas => {
        this.ruas = ruas;
        this.api.listarPontos().subscribe(pontos => {
          this.pontos = pontos;
          
          this.dadosCarregados = true;
          
          // Desenha se o DOM já estiver pronto (ngAfterViewInit já rodou)
          if (this.networkContainerRef) {
            this.desenhar(this.bairros, this.ruas, this.pontos);
          }
        });
      });
    });
  }

  desenhar(bairros: any[], ruas: any[], pontos: any[]) {
    // Verifica se o container do DOM está disponível
    if (!this.networkContainerRef || !this.networkContainerRef.nativeElement) {
        console.error("Erro: Container do Vis.js não encontrado no DOM.");
        return;
    }

    // @ts-ignore - Ignora erro de tipagem no construtor de DataSet
    const nodes = new DataSet(bairros.map(b => ({
      id: b.id,
      label: b.nome,
      shape: 'dot',
      size: 20,
      // Lógica de pintura: Azul se tiver ponto de coleta
      color: pontos.some(p => p.bairro?.id === b.id) ? '#3B82F6' : '#9CA3AF'
    })));

    // @ts-ignore - Ignora erro de tipagem no construtor de DataSet
    const edges = new DataSet(ruas
      .map(r => {
          // 💡 CORREÇÃO CRÍTICA: LÊ O DTO PLANO (origemId/destinoId) DO BACKEND
          if (!r.origemId || !r.destinoId) { 
              console.warn("Conexão inválida (ID ausente) ignorada:", r);
              return null;
          }

          return {
              from: r.origemId,    // Lê o ID plano
              to: r.destinoId,      // Lê o ID plano
              label: r.distanciaKm + 'km',
              arrows: 'to',
              color: { color: '#666' }
          };
      })
      .filter(edge => edge !== null)
    );

    const options = { 
        physics: { enabled: true }, 
        interaction: { hover: true } 
    };
    
    // Cria o objeto de dados final
    const data = { 
        nodes: nodes,
        edges: edges
    };
    
    // Passa o elemento nativo do DOM e o objeto de dados (com casting para evitar erro)
    new Network(this.networkContainerRef.nativeElement, data as any, options); 
  }
}