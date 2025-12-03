import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from "primeng/tabview";
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
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
    TabViewModule,
    MultiSelectModule,
    TagModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }