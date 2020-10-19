import { Component, OnInit } from "@angular/core";
import { JsonPointer } from "projects/ajsf-core/src/lib/shared";
import { HttpClient } from "@angular/common/http";
import * as json from "json-keys-sort";
import { normalizeFormData, normalizeSchema } from "./util";

@Component({
  selector: "app-demo",
  templateUrl: "demo.component.html",
  styleUrls: ["demo.component.scss"],
})
export class DemoComponent implements OnInit {
  jsonFormSchema: string;
  jsonFormValid = false;
  jsonFormStatusMessage = "Loading form...";
  jsonFormObject: unknown;
  jsonFormOptions: any = {
    addSubmit: false, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: false, // Load external css and JavaScript for frameworks
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

  selectedFramework = "aui";

  schema: any;

  constructor(private http: HttpClient) {}

  resource = {
    serviceType: "ClusterIP",
    replicas: 1,
  };

  ngOnInit() {
    const exampleURL = `assets/examples/schema-1.json`;
    this.http
      .get(exampleURL, { responseType: "json" })
      .subscribe((data: any) => {
        const spec = normalizeSchema({ ...data.spec });
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
    return errorArray.join("<br>");
  }

  onChanges(data: unknown) {
    // this.liveFormData = normalizeFormData(data);
    this.liveFormData = data;
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
