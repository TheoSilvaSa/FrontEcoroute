import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CaminhoesComponent } from './pages/caminhoes/caminhoes.component';
import { PontosComponent } from './pages/pontos/pontos.component';
import { ItinerarioComponent } from './pages/itinerario/itinerario.component'; // Importe o componente
import { AuthGuard } from './guards/auth.guard';
import { RotasComponent } from './pages/rotas/rotas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  // Rotas Protegidas pelo AuthGuard
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'caminhoes', component: CaminhoesComponent, canActivate: [AuthGuard] },
  { path: 'pontos', component: PontosComponent, canActivate: [AuthGuard] },
  { path: 'rotas', component: RotasComponent, canActivate: [AuthGuard] },
  // 💡 ROTA FALTANTE ADICIONADA:
  { path: 'itinerario', component: ItinerarioComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }