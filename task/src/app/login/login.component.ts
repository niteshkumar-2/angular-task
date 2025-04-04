import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
      phone_code: "+91",
      device_type: "W",
      device_token: "",
      device_model: "",
      app_version: "",
      os_version: ""
    };
  
    this.http.post(
      "https://dev.myemprove.com/api/ver3api/student-login?lang=en&store=KW",
      loginData,
      { headers: { "Content-Type": "application/json" } }
    ).subscribe({
      next: (response) => {
        console.log("Login successful:", response);
        localStorage.setItem("userData", JSON.stringify(response));
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => {
        console.error("Login failed:", error);
        alert("Login failed! Please check your credentials.");
      }
    });
  }
  
  
}
