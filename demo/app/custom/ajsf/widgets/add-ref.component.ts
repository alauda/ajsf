import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { LayoutNode, NodeOptions } from '../types';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'aui-add-ref-widget',
  templateUrl: 'add-ref.component.html',
  styleUrls: ['add-ref.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuiAddRefComponent implements OnInit {
  options: NodeOptions;
  itemCount: number;
  previousLayoutIndex: number[];
  previousDataIndex: number[];
  @Input() layoutNode: LayoutNode;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private jsf: JsonSchemaFormService) {}

  ngOnInit() {
    this.options = this.layoutNode.options || {};
  }

  get showAddButton(): boolean {
    return (
      !this.layoutNode.arrayItem ||
      this.layoutIndex[this.layoutIndex.length - 1] < this.options.maxItems
    );
  }

  addItem(event) {
    event.preventDefault();
    this.jsf.addItem(this);
  }

  get buttonText(): string {
    const parent: any = {
      dataIndex: this.dataIndex.slice(0, -1),
      layoutIndex: this.layoutIndex.slice(0, -1),
      layoutNode: this.jsf.getParentNode(this),
    };
    return (
      parent.layoutNode.add ||
      this.jsf.setArrayItemTitle(parent, this.layoutNode, this.itemCount)
    );
  }
}
