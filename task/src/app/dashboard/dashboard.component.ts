import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  showOldPassword = true;


  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    this.user = userData ? JSON.parse(userData) : null;

    if (!this.user) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
}
