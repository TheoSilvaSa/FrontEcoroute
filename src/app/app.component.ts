import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router'; // 💡 Importação necessária para verificar a rota

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
items: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-chart-line', routerLink: '/dashboard' },
    { label: 'Caminhões', icon: 'pi pi-truck', routerLink: '/caminhoes' },
    { label: 'Pontos de Coleta', icon: 'pi pi-map-marker', routerLink: '/pontos' },
    { label: 'Rotas Salvas', icon: 'pi pi-list', routerLink: '/rotas' },
    { label: 'Itinerários', icon: 'pi pi-calendar', routerLink: '/itinerario' }, 
    { label: 'Sair', icon: 'pi pi-power-off', command: () => this.logout() }
];

  constructor(private router: Router) {}

  exibirMenu(): boolean {
    // 💡 CORREÇÃO: O menu só aparece se o usuário estiver logado E a URL não for a de login.
    const estaLogado = !!localStorage.getItem('usuarioLogado');
    const estaNaPaginaDeLogin = this.router.url.includes('/login');
    
    // Se estiver logado E não estiver na página de login, ou se não estiver logado, mas estiver na raiz
    return estaLogado && !estaNaPaginaDeLogin;
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }
}