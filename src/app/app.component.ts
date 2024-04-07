import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  AbstractControl,
  FormControlStatus,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
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
    name: this.fb.control(this.initialValues.name, {
      validators: Validators.required,
    }),
  });

  formValues<T>(form: AbstractControl<T>): Observable<T> {
    return form.valueChanges.pipe(map(() => form.getRawValue()));
  }
  $formValues = toSignal(this.formValues(this.form), {
    initialValue: this.form.getRawValue(),
  });

  formStatus<T>(form: AbstractControl<T>): Observable<FormControlStatus> {
    return form.statusChanges.pipe(map(() => form.status));
  }
  $formStatus = toSignal(this.formStatus(this.form), {
    initialValue: this.form.status,
  });

  formTouched<T>(form: AbstractControl<T>): Observable<boolean> {
    return form.events.pipe(map((events) => events.source.touched));
  }
  $formTouched = toSignal(this.formTouched(this.form), {
    initialValue: this.form.touched,
  });

  formPristine<T>(form: AbstractControl<T>): Observable<boolean> {
    return form.events.pipe(map((events) => events.source.pristine));
  }
  $formPristine = toSignal(this.formPristine(this.form), {
    initialValue: this.form.pristine,
  });

  formValueEvent<T>(form: AbstractControl<T>): Observable<T> {
    return form.events.pipe(map((events) => events.source.getRawValue()));
  }
  $formValueEvent = toSignal(this.formValueEvent(this.form), {
    initialValue: this.form.getRawValue(),
  });

  formStatusEvent<T>(form: AbstractControl<T>): Observable<FormControlStatus> {
    return form.events.pipe(map((events) => events.source.status));
  }
  $formStatusEvent = toSignal(this.formStatusEvent(this.form), {
    initialValue: this.form.status,
  });
}
