import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlEvent,
  PristineEvent,
  StatusEvent,
  TouchedEvent,
  ValueChangeEvent,
} from '@angular/forms';
import { combineLatest, filter, map, merge, startWith } from 'rxjs';

export function valueEvents$<T>(form: AbstractControl<T>) {
  return form.events.pipe(
    filter(
      (event: ControlEvent): event is ValueChangeEvent<typeof form.value> =>
        event instanceof ValueChangeEvent
    )
  );
}
export function $valueEvents<T>(form: AbstractControl<T>) {
  return toSignal(valueEvents$(form));
}

export function statusEvents$<T>(form: AbstractControl<T>) {
  return form.events.pipe(
    filter(
      (event: ControlEvent): event is StatusEvent =>
        event instanceof StatusEvent
    )
  );
}
export function $statusEvents<T>(form: AbstractControl<T>) {
  return toSignal(statusEvents$(form));
}

export function touchedEvents$<T>(form: AbstractControl<T>) {
  return form.events.pipe(
    filter(
      (event: ControlEvent): event is TouchedEvent =>
        event instanceof TouchedEvent
    )
  );
}
export function $touchedEvents<T>(form: AbstractControl<T>) {
  return toSignal(touchedEvents$(form));
}

export function pristineEvents$<T>(form: AbstractControl<T>) {
  return form.events.pipe(
    filter(
      (event: ControlEvent): event is PristineEvent =>
        event instanceof PristineEvent
    )
  );
}
export function $prisineEvents<T>(form: AbstractControl<T>) {
  return toSignal(pristineEvents$(form));
}

export function allEvents$<T>(form: AbstractControl<T>) {
  return combineLatest([
    valueEvents$(form),
    statusEvents$(form),
    touchedEvents$(form),
    pristineEvents$(form),
  ]).pipe(
    map(([value, status, touched, pristine]) => {
      return {
        value: value,
        status: status,
        touched: touched,
        pristine: pristine,
      };
    })
  );
}
export function $allEvents<T>(form: AbstractControl<T>) {
  return toSignal(allEvents$(form));
}

export function allEventsValues$<T>(form: AbstractControl<T>) {
  return allEvents$(form).pipe(
    map((events) => {
      return {
        value: events.value.value,
        status: events.status.status,
        touched: events.touched.touched,
        pristine: events.pristine.pristine,
      };
    })
  );
}

export function $allEventsValues<T>(form: AbstractControl<T>) {
  return toSignal(allEventsValues$(form));
}
