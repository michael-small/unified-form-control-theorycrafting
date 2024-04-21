import { Component, inject } from '@angular/core';
import { FormService } from '../form.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-nesting',
  standalone: true,
  imports: [JsonPipe],
  template: ` <pre>{{ form.value | json }}</pre> `,
  styles: ``,
})
export class NestingComponent {
  formService = inject(FormService);
  form = this.formService.form;
}
