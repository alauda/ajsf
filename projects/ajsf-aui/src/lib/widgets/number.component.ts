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
  selector: 'aui-number-widget',
  templateUrl: 'number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuiNumberComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: unknown;
  controlDisabled = false;
  boundControl = false;
  options: NodeOptions;
  allowDecimal = true;
  @Input() layoutNode: LayoutNode;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private readonly jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
    if (this.layoutNode.dataType === 'integer') {
      this.allowDecimal = false;
    }
    if (
      !this.options.notitle &&
      !this.options.description &&
      this.options.placeholder
    ) {
      this.options.description = this.options.placeholder;
    }
  }
}
