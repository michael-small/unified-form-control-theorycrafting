import { Component, inject } from '@angular/core';
import { $allEventsUnified, allEventsUnified$ } from '../form-event-utils';

import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormService } from '../form.service';

@Component({
  selector: 'app-changes',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './changes.component.html',
  styles: ``,
})
export class ChangesComponent {
  formService = inject(FormService);
  form = this.formService.form;

  allEventsUnified$ = allEventsUnified$(this.form);
  $allEventsUnified = $allEventsUnified(this.form);
}
