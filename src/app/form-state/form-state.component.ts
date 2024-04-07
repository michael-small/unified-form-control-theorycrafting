import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControlStatus } from '@angular/forms';

@Component({
  selector: 'app-form-state',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './form-state.component.html',
  styleUrl: './form-state.component.scss',
})
export class FormStateComponent {
  $codeDescription = input.required<string>({ alias: 'codeDescription' });
  $reactiveFormState = input.required<object | FormControlStatus | boolean>({
    alias: 'reactiveFormState',
  });
  $regularFormState = input.required<object | FormControlStatus | boolean>({
    alias: 'regularFormState',
  });
}
