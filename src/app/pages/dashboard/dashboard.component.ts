import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
    standalone: true,
    imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = null;
  photoUrl: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'] ?? null;
  }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigate(['/']);
      return;
    }
    this.photoUrl = `data:image/jpeg;base64,${this.user.photoBase64}`;
  }

  logout() {
    this.router.navigate(['/']);
  }
}
