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
  selector: 'aui-checkbox-widget',
  templateUrl: 'aui-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuiCheckboxComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: unknown;
  controlDisabled = false;
  boundControl = false;
  options: NodeOptions;
  trueValue: any = true;
  falseValue: any = false;
  showSlideToggle = false;
  @Input() layoutNode: LayoutNode;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private readonly jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this, !this.options.readonly);
    if (
      this.layoutNode.type === 'slide-toggle' ||
      this.layoutNode.format === 'slide-toggle'
    ) {
      this.showSlideToggle = true;
    }
  }

  get isChecked() {
    return this.jsf.getFormControlValue(this) === this.trueValue;
  }
}
