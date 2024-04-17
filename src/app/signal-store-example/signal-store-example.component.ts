import { Component, inject } from '@angular/core';
import { FormStore } from './form.store';
import { JsonPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signal-store-example',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  template: `
    <div>
      <h2>NGRX Signal Store</h2>
      <section id="form">
        <form [formGroup]="form">
          <label for="name">Name </label>
          <input [formControl]="form.controls.name" name="name" type="text" />

          <label for="inner-name">Inner Name </label>
          <input
            [formControl]="form.controls.innerForm.controls.innerName"
            name="inner-name"
            type="text"
          />

          <label for="age">Age </label>
          <input [formControl]="form.controls.age" name="age" type="number" />
        </form>
      </section>
      <pre>Value: {{ store.value() | json }}</pre>
      <pre>Status: {{ store.status() | json }}</pre>
      <pre>Pristine: {{ store.pristine() | json }}</pre>
      <pre>Touched: {{ store.touched() | json }}</pre>
      <pre>computed - canDrinkInUSA: {{ store.canDrinkInUSA() }}</pre>
      <pre>computed - canNavigateAway: {{ store.canNavigateAway() }}</pre>
      <pre>value: metadata.valueSinceSave {{ store.metadata() | json }}</pre>
      <button (click)="saveForm()">Save</button>
    </div>
  `,
  styles: ``,
  providers: [FormStore],
})
export class SignalStoreExampleComponent {
  readonly store = inject(FormStore);
  private fb = inject(NonNullableFormBuilder);

  form = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
    }),
    age: new FormControl(''),
    innerForm: new FormGroup({
      innerName: new FormControl(''),
    }),
  });

  saveForm() {
    console.log(this.form.getRawValue());
    this.store.saveForm(this.form.getRawValue());
  }

  ngOnInit() {
    this.store.watchForm(this.form);
  }
}
