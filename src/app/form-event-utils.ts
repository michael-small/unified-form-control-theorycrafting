import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlEvent,
  FormControlStatus,
  PristineChangeEvent,
  StatusChangeEvent,
  TouchedChangeEvent,
  ValueChangeEvent,
  FormResetEvent,
  FormSubmittedEvent,
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
      (event: ControlEvent): event is StatusChangeEvent =>
        event instanceof StatusChangeEvent
    )
  );
}
export function $statusEvents<T>(form: AbstractControl<T>) {
  return toSignal(statusEvents$(form));
}

export function touchedEvents$<T>(form: AbstractControl<T>) {
  return form.events.pipe(
    filter(
      (event: ControlEvent): event is TouchedChangeEvent =>
        event instanceof TouchedChangeEvent
    )
  );
}

export function $touchedEvents<T>(form: AbstractControl<T>) {
  return toSignal(touchedEvents$(form));
}

export function pristineEvents$<T>(form: AbstractControl<T>) {
  return form.events.pipe(
    filter(
      (event: ControlEvent): event is PristineChangeEvent =>
        event instanceof PristineChangeEvent
    )
  );
}
export function $prisineEvents<T>(form: AbstractControl<T>) {
  return toSignal(pristineEvents$(form));
}

export function resetEvents$<T>(form: AbstractControl<T>) {
  return form.events.pipe(
    filter(
      (event: ControlEvent): event is FormResetEvent =>
        event instanceof FormResetEvent
    )
  );
}
export function $resetEvents<T>(form: AbstractControl<T>) {
  return toSignal(resetEvents$(form));
}

export function submitEvents$<T>(form: AbstractControl<T>) {
  return form.events.pipe(
    filter(
      (event: ControlEvent): event is FormSubmittedEvent =>
        event instanceof FormSubmittedEvent
    )
  );
}
export function $submitEvents<T>(form: AbstractControl<T>) {
  return toSignal(submitEvents$(form));
}

function isValueEvent<T>(
  event: ControlEvent | T
): event is ValueChangeEvent<T> {
  return event instanceof ValueChangeEvent;
}
function isStatusEvent<T>(event: ControlEvent | T): event is StatusChangeEvent {
  return event instanceof StatusChangeEvent;
}
function isPristineEvent<T>(
  event: ControlEvent | T
): event is PristineChangeEvent {
  return event instanceof PristineChangeEvent;
}
function isTouchedEvent<T>(
  event: ControlEvent | T
): event is TouchedChangeEvent {
  return event instanceof TouchedChangeEvent;
}

function isSubmittedEvent<T>(
  event: ControlEvent | T
): event is FormSubmittedEvent {
  return event instanceof FormSubmittedEvent;
}
function isResetEvent<T>(event: ControlEvent | T): event is FormResetEvent {
  return event instanceof FormResetEvent;
}

export function allEventsUnified$<T>(form: AbstractControl<T>) {
  return combineLatest([
    valueEvents$(form).pipe(startWith(form.value)),
    statusEvents$(form).pipe(startWith(form.status)),
    touchedEvents$(form).pipe(startWith(form.touched)),
    pristineEvents$(form).pipe(startWith(form.pristine)),
  ]).pipe(
    map(([value, status, touched, pristine]) => {
      let val: T | ValueChangeEvent<T>;
      if (isValueEvent(value)) {
        val = value.value;
      } else {
        val = value;
      }

      let stat: FormControlStatus | StatusChangeEvent;
      if (isStatusEvent(status)) {
        stat = status.status;
      } else {
        stat = status;
      }

      let touch: boolean | TouchedChangeEvent;
      if (isTouchedEvent(touched)) {
        touch = touched.touched;
      } else {
        touch = touched;
      }

      let prist: boolean | PristineChangeEvent;
      if (isPristineEvent(pristine)) {
        prist = pristine.pristine;
      } else {
        prist = pristine;
      }
      return {
        value: val,
        status: stat,
        touched: touch,
        pristine: prist,
      };
    })
  );
}
export function $allEventsUnified<T>(form: AbstractControl<T>) {
  return toSignal(allEventsUnified$(form), {
    initialValue: {
      value: form.value,
      status: form.status,
      pristine: form.pristine,
      touched: form.touched,
    },
  });
}
