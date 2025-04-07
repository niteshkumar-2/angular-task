import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  password: string = '';
  loading = false;
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.token) {
          localStorage.setItem('userData', JSON.stringify(response.data));
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        } else {
          alert(response.message || 'Invalid credentials');
        }
      },
      error: (err) => {
        this.loading = false;
        alert('Login failed!');
      },
    });
  }
}
