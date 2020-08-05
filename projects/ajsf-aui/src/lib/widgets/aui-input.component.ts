import { JsonSchemaFormService } from '@alauda/ajsf-core';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { LayoutNode, NodeOptions } from '../types';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'aui-input-widget',
  templateUrl: 'aui-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AuiInputComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: string;
  controlDisabled = false;
  boundControl = false;
  options: NodeOptions;
  autoCompleteList: string[] = [];
  @Input() layoutNode: LayoutNode;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];
  constructor(private readonly jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
    if (
      !this.options.notitle &&
      !this.options.description &&
      this.options.placeholder
    ) {
      this.options.description = this.options.placeholder;
    }
  }
}
