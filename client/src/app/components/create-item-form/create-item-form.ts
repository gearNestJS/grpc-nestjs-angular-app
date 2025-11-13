import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreateItemRequest } from '../../generated/items/items';

@Component({
  selector: 'grpc-create-item-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    JsonPipe,
  ],
  templateUrl: './create-item-form.html',
  styleUrl: './create-item-form.scss',
})
export class CreateItemForm {
  private fb = inject(FormBuilder);

  // Signals
  form = signal(
    this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      qty: [0, [Validators.required, Validators.min(0)]],
    }),
  );

  isSubmitting = signal(false);
  lastCreatedItem = signal<CreateItemRequest | null>(null);

  onSubmit(): void {
    if (this.form().valid) {
      this.isSubmitting.set(true);

      // Simulate API call
      const formValue = this.form().getRawValue();
      const createItemRequest: CreateItemRequest = {
        name: formValue.name,
        qty: formValue.qty,
      };

      // In real app, you would call gRPC service here
      console.log('Creating item:', createItemRequest);

      // Simulate API delay
      setTimeout(() => {
        this.lastCreatedItem.set(createItemRequest);
        this.isSubmitting.set(false);
        this.form().reset();
      }, 1000);
    }
  }
}
