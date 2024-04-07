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

  // Note #1 - edit - no, it's not flattened, it is the last contained control's event
  valuesChanging$ = combineLatest([
    this.form.valueChanges,
    this.form.events.pipe(map((event) => event.source.getRawValue())),
  ]).pipe(
    tap(([valChanges, eventsVal]) => {
      //   console.log('valueChanges', valChanges, 'eventsValue', eventsVal);
    })
  );

  formEvent<T>(form: AbstractControl<T>): Observable<ControlEvent<T>> {
    return form.events;
  }
  $formEvent = toSignal(this.formEvent(this.form));
  formEvent$ = this.formEvent(this.form).pipe(
    tap((event) => {
      //   console.log(event);
    })
  );

  formValueEventOfParentIdk<T>(form: AbstractControl<T>) {
    return form.events.pipe(
      filter(
        (event): event is ValueChangeEvent<T> =>
          event instanceof ValueChangeEvent
      ),
      //   tap((event) => console.log(event.value)),
      map((event) => event.value)
    );
  }
  formValueEventOfParentIdk$ = this.formValueEventOfParentIdk(this.form);

  //   formEventComposite<T>(form: AbstractControl<T>) {
  //     const value = form.events.pipe(map((event) => event.source.getRawValue()));
  //   }

  eventsAndEventsSource$ = combineLatest([
    this.form.events,
    this.form.events.pipe(map((event) => event.source)),
  ]).pipe(
    tap(([events, eventsSources]) => {
      //   console.log(events);
      //   console.log(eventsSources);
      //   console.log('----------------');
    })
  );

  mappingEventsFromSource$ = this.form.events.pipe(
    map((events) => {
      return {
        value: events.source.value,
        status: events.source.status,
        touched: events.source.touched,
        prisine: events.source.pristine,
      };
    })
    // tap((val) => console.log(val))
  );

  // mappingEvents$ = this.form.events.pipe(
  //   map((events) => {
  //     return {
  //       value: events.value
  //       status: events.source.status,
  //       touched: events.source.touched,
  //       prisine: events.source.pristine,
  //     };
  //   }),
  //   tap((val) => console.log(val))
  // );

  valueEvents$ = this.form.events.pipe(
    filter(
      (
        event: ControlEvent
      ): event is ValueChangeEvent<typeof this.form.value> =>
        event instanceof ValueChangeEvent
    ),
    tap((events) => {
      //   console.log(events);
    })
  );
  $valueEvents = toSignal(this.valueEvents$);
  $eventsEffect = effect(() => {
    const events = this.$valueEvents();
    console.log(events);
  });

  statusEvents$ = this.form.events.pipe(
    filter(
      (event: ControlEvent): event is StatusEvent =>
        event instanceof StatusEvent
    ),
    tap((events) => {
      //   console.log(events);
    })
  );
  $statusEvents = toSignal(this.statusEvents$);
  $statusEffect = effect(() => {
    const events = this.$statusEvents();
    console.log(events);
  });

  touchedEvents$ = this.form.events.pipe(
    filter(
      (event: ControlEvent): event is TouchedEvent =>
        event instanceof TouchedEvent
    )
  );
  touchedEvents = toSignal(this.touchedEvents$);
  $touchedEffect = effect(() => {
    const events = this.touchedEvents();
    console.log(events);
  });

  pristineEvents$ = this.form.events.pipe(
    filter(
      (event: ControlEvent): event is PristineEvent =>
        event instanceof PristineEvent
    )
  );
  $prisineEvents = toSignal(this.pristineEvents$);
  $pristineEffect = effect(() => {
    const events = this.$prisineEvents();
    console.log(events);
  });
}
