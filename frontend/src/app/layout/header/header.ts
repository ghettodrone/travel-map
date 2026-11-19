import { Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  imports: [TooltipModule],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {}
