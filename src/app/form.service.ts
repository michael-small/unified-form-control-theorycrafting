import { Injectable, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  initialValues = {
    name: '',
    age: 0,
    innerForm: {
      innerName: '',
    },
  };

  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: this.fb.control(this.initialValues.name, {
      validators: Validators.required,
    }),
    age: this.fb.control(this.initialValues.age),
    innerForm: this.fb.group({
      innerName: this.fb.control(this.initialValues.innerForm.innerName),
    }),
  });
}
