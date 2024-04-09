import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  AbstractControl,
  ControlEvent,
  FormControlStatus,
  FormGroup,
  NonNullableFormBuilder,
  PristineEvent,
  ReactiveFormsModule,
  StatusEvent,
  TouchedEvent,
  Validators,
  ValueChangeEvent,
} from '@angular/forms';
import { Observable, combineLatest, filter, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormStateComponent } from './form-state/form-state.component';
import {
  $allEvents,
  $allEventsValues,
  $prisineEvents,
  $statusEvents,
  $touchedEvents,
  $valueEvents,
  allEventsValues$,
  pristineEvents$,
  statusEvents$,
  touchedEvents$,
  valueEvents$,
} from './form-event-utils';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormStateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'unified-form-control-theorycrafting';

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

  valueEvents$ = valueEvents$(this.form);
  $valueEvents = $valueEvents(this.form);

  statusEvents$ = statusEvents$(this.form);
  $statusEvents = $statusEvents(this.form);

  pristineEvents$ = pristineEvents$(this.form);
  $pristineEvents = $prisineEvents(this.form);

  touchedEvents$ = touchedEvents$(this.form);
  $touchedEvents = $touchedEvents(this.form);

  $allEvents = $allEvents(this.form);

  allEventsValues$ = allEventsValues$(this.form);
  $allEventsValues = $allEventsValues(this.form);

  $allEventEffects = effect(() => {
    const value = this.$valueEvents();
    const status = this.$statusEvents();
    const pristine = this.$pristineEvents();
    const touched = this.$touchedEvents();
    const allEvents = this.$allEvents();
    const allEventsValues = this.$allEventsValues();

    // console.log(value);
    // console.log(status);
    // console.log(pristine);
    // console.log(touched);
    // console.log(allEvents);
    // console.log(allEventsValues);
    console.log('----------------------');
  });
}
