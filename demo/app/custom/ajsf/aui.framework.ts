import { Injectable } from '@angular/core';
import { AuiFrameworkComponent } from './aui-framework.component';
import { AuiInputComponent } from './widgets/aui-input.component';
import { AuiCheckboxComponent } from './widgets/aui-checkbox.component';
import { Framework } from 'projects/ajsf-core/src/public_api';
import { AuiSectionComponent } from './widgets/aui-section.component';
import { AuiAddRefComponent } from './widgets/add-ref.component';
import { AuiNumberComponent } from './widgets/number.component';
import { AuiSelectComponent } from './widgets/aui-select.component';

@Injectable()
export class AuiFramework extends Framework {
  name = 'aui';

  framework = AuiFrameworkComponent;

  stylesheets = [];

  widgets = {
    // 'root': FlexLayoutRootComponent,
    'section': AuiSectionComponent,
    '$ref': AuiAddRefComponent,
    // 'button': AuiButtonComponent,
    // 'button-group': MaterialButtonGroupComponent,
    // 'checkboxes': MaterialCheckboxesComponent,
    // 'chip-list': MaterialChipListComponent,
    // 'date': MaterialDatepickerComponent,
    // 'file': MaterialFileComponent,
    'number': AuiNumberComponent,
    // 'one-of': MaterialOneOfComponent,
    // 'radios': MaterialRadiosComponent,
    'select': AuiSelectComponent,
    // 'slider': MaterialSliderComponent,
    // 'stepper': MaterialStepperComponent,
    // 'tabs': MaterialTabsComponent,
    'checkbox': AuiCheckboxComponent,
    'text': AuiInputComponent,
    // 'textarea': MaterialTextareaComponent,
    // 'alt-date': 'date',
    // 'any-of': 'one-of',
    // 'card': 'section',
    // 'fieldset': 'section',
    // 'color': 'text',
    // 'expansion-panel': 'section',
    // 'hidden': 'none',
    // 'image': 'none',
    // 'integer': 'number',
    // 'radiobuttons': 'button-group',
    // 'range': 'slider',
    // 'submit': 'button',
    // 'tagsinput': 'chip-list',
    // 'wizard': 'stepper',
  };
}
