import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JsonSchemaFormService } from '@ajsf/core';
import { LayoutNode, NodeOptions } from '../types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'aui-number-widget',
  templateUrl: 'number.component.html',
  styleUrls: ['number.component.scss'],
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

  constructor(private jsf: JsonSchemaFormService) {}

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

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
