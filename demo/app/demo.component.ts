import { Component, OnInit } from '@angular/core';
import { JsonPointer } from 'projects/ajsf-core/src/lib/shared';
import { HttpClient } from '@angular/common/http';
import * as json from 'json-keys-sort';
import { isObject, isEmpty, isArray } from 'lodash-es';

function normalizeFormData(data: any) {
  Object.keys(data).forEach((key) => {
    if (isArray(data[key])) {
      data[key].forEach((item) => {
        if (isObject(item)) {
          normalizeFormData(item);
        }
      });
      data[key] = data[key].filter((item) => !isEmpty(item));
      if (!data[key].length) {
        delete data[key];
      }
    } else if (isObject(data[key])) {
      normalizeFormData(data[key]);
      if (isEmpty(data[key])) {
        delete data[key];
      }
    }
  });
  return data;
}

function normalizeSchema(schema: any) {
  if (!schema.properties) {
    return null;
  }
  const properties = schema.properties;
  Object.keys(properties).forEach((key) => {
    const _schema = properties[key];
    if (_schema.type === 'object' && !_schema.properties) {
      delete properties[key];
    } else if (_schema.type === 'object' && _schema.properties) {
      normalizeSchema(_schema);
      if (!_schema.properties || Object.keys(_schema.properties).length === 0) {
        delete properties[key];
      }
    } else if (_schema.type === 'array' && _schema.items.type === 'object') {
      normalizeSchema(_schema.items);
      if (
        !_schema.items?.properties ||
        Object.keys(_schema.items.properties).length === 0
      ) {
        delete properties[key];
      }
    }
  });
  return schema;
}

@Component({
  selector: 'app-demo',
  templateUrl: 'demo.component.html',
  styleUrls: ['demo.component.scss'],
})
export class DemoComponent implements OnInit {
  jsonFormSchema: string;
  jsonFormValid = false;
  jsonFormStatusMessage = 'Loading form...';
  jsonFormObject: unknown;
  jsonFormOptions: any = {
    addSubmit: false, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: false, // Don't return values for empty input fields
    setSchemaDefaults: false, // Always use schema defaults for empty fields
    defautWidgetOptions: {
      feedback: true,
      orderable: false,
      expandable: true,
      expanded: true,
      listItems: 0,
      minItems: 0,
    }, // Show inline feedback icons
  };
  liveFormData: any = {};
  formValidationErrors: any;
  formIsValid = null;
  submittedFormData: any = null;

  selectedFramework = 'aui';

  schema: any;

  constructor(private http: HttpClient) {}

  resource = {};

  ngOnInit() {
    const exampleURL = `assets/examples/schema-1.json`;
    this.http
      .get(exampleURL, { responseType: 'json' })
      .subscribe((data: any) => {
        const spec = { ...data.spec };
        console.log(JSON.stringify(spec));
        json.sort(spec.properties);
        this.schema = spec.properties;
      });
  }

  onSubmit(data: any) {
    this.submittedFormData = data;
  }
  get prettyValidationErrors() {
    if (!this.formValidationErrors) {
      return null;
    }
    const errorArray = [];
    for (const error of this.formValidationErrors) {
      const message = error.message;
      const dataPathArray = JsonPointer.parse(error.dataPath);
      if (dataPathArray.length) {
        let field = dataPathArray[0];
        for (let i = 1; i < dataPathArray.length; i++) {
          const key = dataPathArray[i];
          field += /^\d+$/.test(key) ? `[${key}]` : `.${key}`;
        }
        errorArray.push(`${field}: ${message}`);
      } else {
        errorArray.push(message);
      }
    }
    return errorArray.join('<br>');
  }

  onChanges(data: unknown) {
    this.liveFormData = normalizeFormData(data);
  }

  getPrettyData(data: unknown) {
    return JSON.stringify(data, null, 2);
  }

  isValid(isValid: boolean): void {
    this.formIsValid = isValid;
  }

  validationErrors(data: any): void {
    this.formValidationErrors = data;
  }
}
