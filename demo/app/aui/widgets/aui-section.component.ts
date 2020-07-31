import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { JsonSchemaFormService } from 'projects/ajsf-core/src/public_api';
import { LayoutNode, NodeOptions } from '../types';

const dataTypeWeight = {
  string: 3,
  integer: 3,
  object: 2,
  array: 1,
};

function getNodeWeigth(node: any) {
  return dataTypeWeight[node.dataType] || 0;
}

function sortNodes(nodes: any[]) {
  return nodes.sort((a, b) => {
    return getNodeWeigth(b) - getNodeWeigth(a);
  });
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'section-widget',
  templateUrl: 'aui-section.component.html',
  styleUrls: ['aui-section.component.scss'],
})
export class AuiSectionComponent implements OnInit {
  options: NodeOptions;
  expanded = true;
  containerType: string;
  @Input() layoutNode: LayoutNode;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private jsf: JsonSchemaFormService) {}

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
    // this.expanded = this.isRootSection;
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
    // console.log('container type: ', this.containerType);
  }

  toggleExpanded() {
    if (this.options.expandable) {
      this.expanded = !this.expanded;
    }
  }

  // Set attributes for flexbox container
  // (child attributes are set in root.component)
  getFlexAttribute(attribute: string) {
    const flexActive: boolean =
      this.layoutNode.type === 'flex' ||
      !!this.options.displayFlex ||
      this.options.display === 'flex';
    if (attribute !== 'flex' && !flexActive) {
      return null;
    }
    switch (attribute) {
      case 'is-flex':
        return flexActive;
      case 'display':
        return flexActive ? 'flex' : 'initial';
      case 'flex-direction':
      case 'flex-wrap':
        const index = ['flex-direction', 'flex-wrap'].indexOf(attribute);
        return (
          (this.options['flex-flow'] || '').split(/\s+/)[index] ||
          this.options[attribute] ||
          ['column', 'nowrap'][index]
        );
      case 'justify-content':
      case 'align-items':
      case 'align-content':
        return this.options[attribute];
    }
  }
}
