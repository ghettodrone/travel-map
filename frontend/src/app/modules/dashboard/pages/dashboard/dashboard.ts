import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  imports: [CardModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
