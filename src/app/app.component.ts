import { Component, computed, effect, inject, signal } from '@angular/core';
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
import {
  $allEvents,
  $allEventsUnified,
  $allEventsValues,
  $prisineEvents,
  $statusEvents,
  $touchedEvents,
  $valueEvents,
  allEventsUnified$,
  allEventsValues$,
  pristineEvents$,
  statusEvents$,
  touchedEvents$,
  valueEvents$,
} from './form-event-utils';
import { SignalStoreExampleComponent } from './signal-store-example/signal-store-example.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    SignalStoreExampleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  $showSignalStore = signal(true);
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

  valueEvents$ = valueEvents$(this.form).pipe(tap(console.log));
  $valueEvents = $valueEvents(this.form);

  statusEvents$ = statusEvents$(this.form).pipe(tap(console.log));
  $statusEvents = $statusEvents(this.form);

  pristineEvents$ = pristineEvents$(this.form).pipe(tap(console.log));
  $pristineEvents = $prisineEvents(this.form);

  touchedEvents$ = touchedEvents$(this.form).pipe(tap(console.log));
  $touchedEvents = $touchedEvents(this.form);

  $allEvents = $allEvents(this.form);

  allEventsUnified$ = allEventsUnified$(this.form);
  $allEventsUnified = $allEventsUnified(this.form);

  constructor() {
    effect(() => console.log(this.$valueEvents()));
    effect(() => console.log(this.$statusEvents()));
    effect(() => console.log(this.$touchedEvents()));
    effect(() => console.log(this.$pristineEvents()));
  }

  ngOnInit() {
    this.valueEvents$.subscribe();
    this.statusEvents$.subscribe();
    this.touchedEvents$.subscribe();
    this.pristineEvents$.subscribe();
  }
}
