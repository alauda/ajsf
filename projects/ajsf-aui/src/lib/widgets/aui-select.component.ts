import { JsonSchemaFormService, buildTitleMap, isArray } from '@alauda/ajsf-core';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'aui-select-widget',
  templateUrl: 'aui-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuiSelectComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  selectList: any[] = [];
  isArray = isArray;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private readonly jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.selectList = buildTitleMap(
      this.options.titleMap || this.options.enumNames,
      this.options.enum,
      !!this.options.required,
      !!this.options.flatList,
    );
    this.jsf.initializeControl(this, !this.options.readonly);
    if (
      !this.options.notitle &&
      !this.options.description &&
      this.options.placeholder
    ) {
      this.options.description = this.options.placeholder;
    }
  }
}
