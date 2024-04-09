import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlEvent,
  PristineEvent,
  StatusEvent,
  TouchedEvent,
  ValueChangeEvent,
} from '@angular/forms';
import { filter } from 'rxjs';

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
