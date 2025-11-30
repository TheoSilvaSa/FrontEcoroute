import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  tabIndex = 0;

  email = '';
  senha = '';

  novoUsuario: any = {
    nome: '',
    email: '',
    senha: '',
    perfil: 'USER'
  };

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

  cadastrar() {
    if (!this.novoUsuario.nome || !this.novoUsuario.email || !this.novoUsuario.senha) {
      this.msg.add({severity:'warn', summary:'Atenção', detail:'Preencha todos os campos obrigatórios.'});
      return;
    }

    this.api.cadastrarUsuario(this.novoUsuario).subscribe({
      next: () => {
        this.msg.add({severity:'success', summary:'Sucesso', detail:'Usuário cadastrado! Faça login.'});
        this.novoUsuario = { nome: '', email: '', senha: '', perfil: 'USER' };
        this.tabIndex = 0;
        this.email = this.novoUsuario.email;
      },
      error: (err) => {
        this.msg.add({severity:'error', summary:'Erro', detail: err.error.message || 'Falha ao cadastrar usuário.'});
      }
    });
  }
}
