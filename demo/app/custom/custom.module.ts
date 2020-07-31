import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFormComponent } from './form/component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { JsonSchemaFormModule } from 'projects/ajsf-core/src/public_api';
import { AuiFrameworkModule } from './ajsf/aui-framework.module';
import { PurePipe } from '../pure.pipe';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [DemoFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    JsonSchemaFormModule,
    AuiFrameworkModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DemoFormComponent,
      },
    ]),
  ],
})
export class CustomModule {}
