import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Network, Data } from 'vis-network'; 
import { DataSet } from 'vis-data';

@Component({ 
  selector: 'app-mapa-grafo', 
  templateUrl: './mapa-grafo.component.html' 
})
export class MapaGrafoComponent implements OnInit, AfterViewInit {
  
  @ViewChild('networkContainer') networkContainerRef!: ElementRef;

  private bairros: any[] = [];
  private ruas: any[] = [];
  private pontos: any[] = [];
  private dadosCarregados: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.carregarDados();
  }

  ngAfterViewInit() {
    if (this.dadosCarregados) {
      this.desenhar(this.bairros, this.ruas, this.pontos);
    }
  }

  carregarDados() {
    this.api.listarBairros().subscribe(bairros => {
      this.bairros = bairros;
      this.api.listarRuas().subscribe(ruas => {
        this.ruas = ruas;
        this.api.listarPontos().subscribe(pontos => {
          this.pontos = pontos;
          
          this.dadosCarregados = true;
          
          if (this.networkContainerRef) {
            this.desenhar(this.bairros, this.ruas, this.pontos);
          }
        });
      });
    });
  }

  desenhar(bairros: any[], ruas: any[], pontos: any[]) {
    if (!this.networkContainerRef || !this.networkContainerRef.nativeElement) {
        console.error("Erro: Container do Vis.js não encontrado no DOM.");
        return;
    }

    const nodes = new DataSet(bairros.map(b => ({
      id: b.id,
      label: b.nome,
      shape: 'dot',
      size: 20,
      color: pontos.some(p => p.bairro?.id === b.id) ? '#3B82F6' : '#9CA3AF'
    })));

    // @ts-ignore - Ignora erro de tipagem no construtor de DataSet
    const edges = new DataSet(ruas
      .map(r => {
          if (!r.origemId || !r.destinoId) { 
              console.warn("Conexão inválida (ID ausente) ignorada:", r);
              return null;
          }

          return {
              from: r.origemId,
              to: r.destinoId,
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
    

    const data = { 
        nodes: nodes,
        edges: edges
    };
    
    new Network(this.networkContainerRef.nativeElement, data as any, options); 
  }
}