import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoComponent } from './demo.component';
import { DemoRootComponent } from './demo-root.component';
import { routes } from './demo.routes';
import { SharedModule } from './shared.module';
import { AuiFrameworkModule } from 'projects/ajsf-aui/src/public-api';
import { JsonSchemaFormModule } from 'projects/ajsf-core/src/public_api';

@NgModule({
  declarations: [DemoComponent, DemoRootComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AuiFrameworkModule,
    JsonSchemaFormModule,
    SharedModule,
  ],
  bootstrap: [DemoRootComponent],
})
export class DemoModule {}
