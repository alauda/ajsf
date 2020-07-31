import { AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { JsonSchemaFormService, hasOwn } from '@ajsf/core';
import { LayoutNode, NodeOptions } from '../types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'aui-button-widget',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
})
export class AuiButtonComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: unknown;
  controlDisabled = false;
  boundControl = false;
  options: NodeOptions;
  @Input() layoutNode: LayoutNode;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
    if (hasOwn(this.options, 'disabled')) {
      this.controlDisabled = this.options.disabled;
    } else if (this.jsf.formOptions.disableInvalidSubmit) {
      this.controlDisabled = !this.jsf.isValid;
      this.jsf.isValidChanges.subscribe(isValid => this.controlDisabled = !isValid);
    }
  }

  updateValue(event) {
    if (typeof this.options.onClick === 'function') {
      this.options.onClick(event);
    } else {
      this.jsf.updateValue(this, event.target.value);
    }
  }
}
