import { JsonSchemaFormService, isDefined } from '@ajsf/core';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { cloneDeep } from 'lodash-es';

import { LayoutNode, NodeOptions } from './types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'aui-framework',
  templateUrl: './aui-framework.template.html',
  styleUrls: ['./aui-framework.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuiFrameworkComponent implements OnInit, OnChanges {
  frameworkInitialized = false;
  inputType: string;
  options: NodeOptions; // Options used in this framework
  widgetLayoutNode: LayoutNode; // layoutNode passed to child widget
  widgetOptions: NodeOptions; // Options passed to child widget
  formControl: any = null;
  parentArray: any = null;
  isOrderable = false;
  dynamicTitle: string = null;
  @Input() layoutNode: LayoutNode;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private readonly jsf: JsonSchemaFormService) {}

  get isArrayItem() {
    return (
      this.layoutNode &&
      this.layoutNode.arrayItem &&
      this.layoutNode.type !== '$ref'
    );
  }

  get isTextArrayItem() {
    return this.isArrayItem && this.layoutNode.type === 'text';
  }

  get showRemoveButton(): boolean {
    if (
      !this.layoutNode ||
      !this.widgetOptions.removable ||
      this.widgetOptions.readonly ||
      this.layoutNode.type === '$ref'
    ) {
      return false;
    }
    if (this.layoutNode.recursiveReference) {
      return true;
    }
    if (!this.layoutNode.arrayItem || !this.parentArray) {
      return false;
    }
    // For removable list items, allow removing any item
    return this.layoutNode.arrayItemType === 'list'
      ? true
      : // For removable tuple items, only allow removing last item in list
        this.layoutIndex[this.layoutIndex.length - 1] ===
          this.parentArray.items.length - 2;
  }

  ngOnInit() {
    this.initializeFramework();
  }

  ngOnChanges() {
    if (!this.frameworkInitialized) {
      this.initializeFramework();
    }
    if (this.dynamicTitle) {
      this.updateTitle();
    }
  }

  // tslint:disable: cognitive-complexity
  initializeFramework() {
    if (this.layoutNode) {
      this.options = cloneDeep(this.layoutNode.options || {});
      this.widgetLayoutNode = {
        ...this.layoutNode,
        options: cloneDeep(this.layoutNode.options || {}),
      };
      this.widgetOptions = this.widgetLayoutNode.options;
      this.formControl = this.jsf.getFormControl(this);

      if (
        isDefined(this.widgetOptions.minimum) &&
        isDefined(this.widgetOptions.maximum) &&
        this.widgetOptions.multipleOf >= 1
      ) {
        this.layoutNode.type = 'range';
      }

      if (
        ![
          '$ref',
          'advancedfieldset',
          'authfieldset',
          'button',
          'card',
          'checkbox',
          'expansion-panel',
          'help',
          'message',
          'msg',
          'section',
          'submit',
          'tabarray',
          'tabs',
        ].includes(this.layoutNode.type) &&
        /{{.+?}}/.test(this.widgetOptions.title || '')
      ) {
        this.dynamicTitle = this.widgetOptions.title;
        this.updateTitle();
      }

      if (this.layoutNode.arrayItem && this.layoutNode.type !== '$ref') {
        this.parentArray = this.jsf.getParentNode(this);
      }

      this.frameworkInitialized = true;
    } else {
      this.options = {};
    }
  }

  updateTitle() {
    this.widgetLayoutNode.options.title = this.jsf.parseText(
      this.dynamicTitle,
      this.jsf.getFormControlValue(this),
      this.jsf.getFormControlGroup(this).value,
      this.dataIndex[this.dataIndex.length - 1],
    );
  }

  removeItem() {
    this.jsf.removeItem(this);
  }
}
