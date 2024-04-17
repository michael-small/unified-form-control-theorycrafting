import {
  FormControl,
  FormControlStatus,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { allEventsUnified$ } from '../form-event-utils';
import { tapResponse } from '@ngrx/operators';

type FormState = {
  value: any;
  status: FormControlStatus;
  touched: boolean;
  pristine: boolean;
};

const initialState: FormState = {
  value: {
    name: '',
    age: 0,
    innerForm: {
      innerName: '',
    },
  },
  status: 'PENDING',
  touched: false,
  pristine: true,
};

export const FormStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    watchForm: rxMethod<any>(
      pipe(
        switchMap((form) => {
          return allEventsUnified$(form).pipe(
            tap((v) => console.log('val', v)),
            tapResponse({
              next: (unifiedEvents) =>
                patchState(store, {
                  value: unifiedEvents.value,
                  status: unifiedEvents.status,
                  touched: unifiedEvents.touched,
                  pristine: unifiedEvents.pristine,
                }),
              error: console.error,
            })
          );
        })
      )
    ),
  }))
);
