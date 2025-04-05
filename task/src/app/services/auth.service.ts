import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email,
      password,
      phone_code: "+91",
      device_type: "W",
      device_token: "",
      device_model: "",
      app_version: "",
      os_version: ""
    };

    return this.http.post(`${this.apiUrl}/student-login?lang=en&store=KW`, loginData, {
      headers: { "Content-Type": "application/json" }
    });
  }

  logout() {
    localStorage.removeItem("userData");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("userData");
  }
}
