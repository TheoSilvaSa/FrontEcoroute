import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = ''; senha = '';

  constructor(private api: ApiService, private router: Router, private msg: MessageService) {}

  logar() {
    this.api.login({ email: this.email, senha: this.senha }).subscribe({
      next: (user) => {
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      },
      error: () => this.msg.add({severity:'error', summary:'Erro', detail:'Credenciais inválidas'})
    });
  }
}