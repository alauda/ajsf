import {
  Framework,
  FrameworkLibraryService,
  JsonSchemaFormModule,
  JsonSchemaFormService,
  WidgetLibraryModule,
  WidgetLibraryService,
} from '@ajsf/core';
import {
  ButtonModule,
  CheckboxModule,
  DropdownModule,
  FormModule,
  IconModule,
  InputModule,
  RadioModule,
  SelectModule,
  SwitchModule,
  TagModule,
} from '@alauda/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuiFramework } from './aui.framework';
import { AUI_FRAMEWORK_COMPONENTS } from './widgets/public-api';

export const AUI_MODULES = [
  ButtonModule,
  CheckboxModule,
  DropdownModule,
  FormModule,
  IconModule,
  InputModule,
  RadioModule,
  SelectModule,
  SwitchModule,
  TagModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...AUI_MODULES,
    WidgetLibraryModule,
    JsonSchemaFormModule,
  ],
  declarations: [...AUI_FRAMEWORK_COMPONENTS],
  exports: [JsonSchemaFormModule, ...AUI_FRAMEWORK_COMPONENTS],
  providers: [
    JsonSchemaFormService,
    FrameworkLibraryService,
    WidgetLibraryService,
    { provide: Framework, useClass: AuiFramework, multi: true },
  ],
  entryComponents: [...AUI_FRAMEWORK_COMPONENTS],
})
export class AuiFrameworkModule {}
