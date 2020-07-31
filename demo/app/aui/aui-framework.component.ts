import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import {
  isDefined,
  JsonSchemaFormService,
} from 'projects/ajsf-core/src/public_api';
import cloneDeep from 'lodash/cloneDeep';
import { NodeOptions, LayoutNode } from './types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'aui-framework',
  templateUrl: './aui-framework.template.html',
  styleUrls: ['./aui-framework.styles.scss'],
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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private jsf: JsonSchemaFormService
  ) {}

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
    // If array length <= minItems, don't allow removing any items
    // return this.parentArray.items.length - 1 <= this.parentArray.options.minItems ? false :
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
        if (this.parentArray) {
          this.isOrderable =
            this.parentArray.type.slice(0, 3) !== 'tab' &&
            this.layoutNode.arrayItemType === 'list' &&
            !this.widgetOptions.readonly &&
            this.parentArray.options.orderable;
        }
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
      this.dataIndex[this.dataIndex.length - 1]
    );
  }

  removeItem() {
    this.jsf.removeItem(this);
  }
}
