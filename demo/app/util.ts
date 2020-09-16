import { isArray, isEmpty, isObject } from 'lodash';

export function normalizeSchema(schema: any) {
  if (!schema.properties) {
    return null;
  }
  const properties = schema.properties;
  Object.keys(properties).forEach((key) => {
    const _schema = properties[key];
    if (_schema.type === "object" && !_schema.properties) {
      delete properties[key];
    } else if (_schema.type === "object" && _schema.properties) {
      normalizeSchema(_schema);
      if (!_schema.properties || Object.keys(_schema.properties).length === 0) {
        delete properties[key];
      }
    } else if (_schema.type === "array" && _schema.items.type === "object") {
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

export function normalizeFormData(data: any) {
  Object.keys(data).forEach((key) => {
    if (isArray(data[key])) {
      data[key].forEach((item) => {
        if (isObject(item)) {
          normalizeFormData(item);
        }
      });
      data[key] = data[key].filter((item) => !isEmpty(item));
      if (isEmpty(data[key])) {
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
