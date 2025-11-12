import { Component, signal } from '@angular/core';

@Component({
  selector: 'grpc-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('clint');
}
