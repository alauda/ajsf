import { Framework } from '@alauda/ajsf-core';
import { Injectable } from '@angular/core';

import { AuiFrameworkComponent } from './aui-framework.component';
import { AuiAddRefComponent } from './widgets/add-ref.component';
import { AuiCheckboxComponent } from './widgets/aui-checkbox.component';
import { AuiInputComponent } from './widgets/aui-input.component';
import { AuiSectionComponent } from './widgets/aui-section.component';
import { AuiSelectComponent } from './widgets/aui-select.component';
import { AuiNumberComponent } from './widgets/number.component';

@Injectable()
export class AuiFramework extends Framework {
  name = 'aui';

  framework = AuiFrameworkComponent;

  widgets = {
    section: AuiSectionComponent,
    $ref: AuiAddRefComponent,
    number: AuiNumberComponent,
    select: AuiSelectComponent,
    checkbox: AuiCheckboxComponent,
    text: AuiInputComponent,
    hidden: 'none',
    image: 'none',
    integer: 'number',
  };
}
