import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'unified-form-control-theorycrafting';

  initialValues = {
    name: '',
  };

  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: this.fb.control(this.initialValues.name),
  });

  formValues$ = this.formValues(this.form);
  $formValues = toSignal(this.formValues$, {
    initialValue: this.initialValues,
  });

  formValues<T>(form: AbstractControl<T>): Observable<T> {
    return form.valueChanges.pipe(map(() => form.getRawValue()));
  }
}
