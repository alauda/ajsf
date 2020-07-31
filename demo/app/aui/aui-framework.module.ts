import {
  Framework,
  FrameworkLibraryService,
  JsonSchemaFormModule,
  JsonSchemaFormService,
  WidgetLibraryModule,
  WidgetLibraryService,
} from '@ajsf/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { AuiFramework } from './aui.framework';
import { AUI_FRAMEWORK_COMPONENTS } from './widgets/public_api';
import { SharedModule } from 'demo/app/shared.module';

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
    SharedModule,
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
export class AuiFrameworkModule {
  constructor() {}
}
