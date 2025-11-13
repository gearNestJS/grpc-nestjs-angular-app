import { Component } from '@angular/core';
import { CreateItemForm } from './components/create-item-form/create-item-form';

@Component({
  selector: 'grpc-root',
  imports: [CreateItemForm],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
