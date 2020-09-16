import { JsonSchemaFormService } from '@alauda/ajsf-core';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { LayoutNode, NodeOptions } from '../types';

const dataTypeWeight: {
  [key: string]: number;
} = {
  string: 3,
  integer: 3,
  boolean: 3,
  object: 2,
  array: 1,
};

function getNodeWeigth(node: LayoutNode) {
  return dataTypeWeight[node.dataType] || 0;
}

function sortNodes(nodes: LayoutNode[]) {
  return nodes.sort((a, b) => {
    return getNodeWeigth(b) - getNodeWeigth(a);
  });
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'section-widget',
  templateUrl: 'aui-section.component.html',
  styleUrls: ['aui-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuiSectionComponent implements OnInit {
  options: NodeOptions;
  expanded = true;
  containerType: string;
  @Input() layoutNode: LayoutNode;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private readonly jsf: JsonSchemaFormService) {}

  get isRootSection(): boolean {
    return this.layoutIndex && this.layoutIndex.length === 1;
  }

  get sectionTitle() {
    return this.options.notitle ? null : this.jsf.setItemTitle(this);
  }

  get isArrayItem() {
    return this.layoutNode.type === 'array';
  }

  ngOnInit() {
    sortNodes(this.layoutNode.items);
    this.jsf.initializeControl(this);
    this.options = this.layoutNode.options || {};
    this.expanded = !!this.options?.required;
    switch (this.layoutNode.type) {
      case 'fieldset':
      case 'array':
      case 'tab':
      case 'advancedfieldset':
      case 'authfieldset':
      case 'optionfieldset':
      case 'selectfieldset':
        this.containerType = 'fieldset';
        break;
      default:
        // 'div', 'flex', 'section', 'conditional', 'actions', 'tagsinput'
        this.containerType = 'div';
        break;
    }
  }

  toggleExpanded() {
    if (this.options.expandable) {
      this.expanded = !this.expanded;
    }
  }
}
