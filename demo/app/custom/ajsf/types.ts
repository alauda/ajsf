export interface NodeOptions {
  addable?: boolean;
  disabled?: boolean;
  enableErrorState?: boolean;
  enableSuccessState?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  feedback?: boolean;
  feedbackOnRender?: boolean;
  listItems?: number;
  maxItems?: number;
  minItems?: number;
  notitle?: boolean;
  orderable?: boolean;
  readonly?: boolean;
  removable?: boolean;
  required?: boolean;
  returnEmptyFields?: boolean;
  title?: string;
  tupleItems?: number;
  type?: string;
  description?: string;
  placeholder?: string;
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  showErrors?: boolean;
  displayFlex?: boolean;
  display?: string;
  onClick?: any;
  htmlClass?: string;
  errorMessage?: string;
}

export interface LayoutNode {
  _id?: string;
  arrayItem?: boolean;
  dataPointer?: string;
  dataType?: string;
  items?: LayoutNode[];
  name?: string;
  required?: boolean;
  type?: string;
  widget?: unknown;
  options?: NodeOptions;
  arrayItemType?: string;
  recursiveReference?: unknown;
  format?: string;
}
