import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, Header, Sidebar,],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout {}
