// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// PrimeNG Modules Necessários para o Projeto:
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';
// MÓDULOS DE ITINERÁRIO FALTANTES:
import { FieldsetModule } from 'primeng/fieldset';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
// 💡 CORREÇÃO: MÓDULO FALTANTE PARA P-TABVIEW E P-TABPANEL
import { TabViewModule } from 'primeng/tabview';

// Componentes (Garantindo que todos estão declarados)
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CaminhoesComponent } from './pages/caminhoes/caminhoes.component';
import { PontosComponent } from './pages/pontos/pontos.component';
import { MapaGrafoComponent } from './components/mapa-grafo/mapa-grafo.component';
import { ItinerarioComponent } from './pages/itinerario/itinerario.component';
import { RotasComponent } from './pages/rotas/rotas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CaminhoesComponent,
    PontosComponent,
    MapaGrafoComponent,
    ItinerarioComponent,
    RotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    // Módulos PrimeNG
    InputTextModule,
    ButtonModule,
    CardModule,
    TableModule,
    DialogModule,
    ToolbarModule,
    ToastModule,
    MenubarModule,
    FieldsetModule,
    ListboxModule,
    DropdownModule,
    CalendarModule,
    TabViewModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
