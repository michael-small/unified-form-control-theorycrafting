import {
  FormControl,
  FormControlStatus,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { allEventsUnified$ } from '../form-event-utils';
import { tapResponse } from '@ngrx/operators';
import { computed } from '@angular/core';

type FormState = {
  value: any;
  status: FormControlStatus;
  touched: boolean;
  pristine: boolean;
  metadata: {
    pageState: 'new' | 'existing';
    submitted: boolean;
    valueSinceSave: any;
  };
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
  metadata: {
    pageState: 'new',
    submitted: false,
    valueSinceSave: {
      name: '',
      age: 0,
      innerForm: {
        innerName: '',
      },
    },
  },
};

export const FormStore = signalStore(
  withState(initialState),
  withComputed(({ value, status, touched, pristine, metadata }) => ({
    canDrinkInUSA: computed(() => value().age >= 21),
    canNavigateAway: computed(() => {
      // Context - This example is not routed, but in a current app of ours we need to warn the user
      //           when navigating away from the page with a form, but only in certain scenarios like below.
      const existingConfigWithoutChanges =
        metadata.pageState() === 'existing' &&
        status() === 'VALID' &&
        JSON.stringify(metadata.valueSinceSave()) === JSON.stringify(value());
      const newSavedConfigWithoutChanges =
        metadata.pageState() === 'new' &&
        status() === 'VALID' &&
        JSON.stringify(metadata.valueSinceSave()) === JSON.stringify(value());
      const canMoveAway =
        existingConfigWithoutChanges || newSavedConfigWithoutChanges;
      return canMoveAway;
    }),
  })),
  withMethods((store) => ({
    // TODO - type
    saveForm(valueSinceSave: any): void {
      patchState(store, (state) => ({
        metadata: { ...state.metadata, valueSinceSave },
      }));
    },
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
