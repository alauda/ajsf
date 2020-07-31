import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from 'projects/ajsf-core/src/public_api';
import { LayoutNode, NodeOptions } from '../types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'aui-checkbox-widget',
  templateUrl: 'aui-checkbox.component.html',
  styleUrls: ['aui-checkbox.component.scss'],
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

  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this, !this.options.readonly);
    // if (this.controlValue === null || this.controlValue === undefined) {
    //   this.controlValue = false;
    //   this.jsf.updateValue(this, this.falseValue);
    // }
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
