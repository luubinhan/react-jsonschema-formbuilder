import set from 'lodash.set';
import camelCase from 'lodash.camelcase';
import unset from 'lodash.unset';
import cloneDeep from 'lodash.clonedeep';

export const ADD_GROUP = 'ADD_GROUP';
export const ADD_PROPERTY = 'ADD_PROPERTY';
export const UPDATE_PROPERTIES = 'UPDATE_PROPERTIES';
export const UPDATE_PATH = 'UPDATE_PATH';
export const REMOVE_PATH = 'REMOVE_PATH';
export const UPDATE_REQUIRED = 'UPDATE_REQUIRED';

const DEFAULT_GROUP = {
  title: '',
  type: 'object',
  required: [],
  properties: {}
}

const initState = {
  schema: {
    title: 'Personal',
    description: '',
    type: 'object',
    properties: {
      // group
      // - field
      1: {
        title: 'a',
        type: 'object',
        required: [],
        properties: {
          field1: {
            title: 'field 1',
            type: 'string',
          },
          field2: {
            title: 'field 2',
            type: 'number',
          },
          field3: {
            title: 'field 3',
            type: 'string',
            format: 'file'
          }
        }
      },
      2: {
        title: 'b',
        type: 'object',
        required: [],
        properties: {}
      }
    }
  },
  uiSchema: {},
};

const JsonSchemaBuilder = (state = initState, { type, payload = {} }) => {
  switch (type) {
    case UPDATE_PATH: {
      const newState = cloneDeep(state);
      const { path, value } = payload;
      set(newState, path, value);
      return newState;
    }
    case REMOVE_PATH: {
      const newState = cloneDeep(state);
      unset(newState, payload);
      return newState;
    }
    case UPDATE_REQUIRED: {
      const { groupKey, key } = payload;
      const newState = cloneDeep(state);
      // find `key`, if found remove, otherwise add
      if (newState.schema.properties[groupKey]
        && newState.schema.properties[groupKey].required
      ) {
        const { required } = newState.schema.properties[groupKey];
        const foundedIndex = required.indexOf(key);
        if (foundedIndex > -1) {
          required.splice(foundedIndex, 1);
        } else {
          required.push(key);
        }
        set(newState, `schema.properties.${groupKey}.required`, required);
      }
      return newState;
    }
    case ADD_PROPERTY: {
      const { key, property } = payload;
      const newSchema = cloneDeep(state.schema);
      const newKey = camelCase(property.title);
      const newField = {
        ...property
      };
      // special case for file, and date, add type = string
      if (newField.type === 'file') {
        set(newField, 'type', 'string');
        set(newField, 'format', 'file');
      }
      if (newField.type === 'date') {
        set(newField, 'type', 'string');
        set(newField, 'format', 'date');
      }
      // set required for group / parent group
      if (newField.required) {
        newSchema.properties[key].required.push(newKey);
      }
      set(newSchema, `properties.${key}.properties.${newKey}`, newField);
      return {
        ...state,
        schema: newSchema
      };
    }
    case UPDATE_PROPERTIES: {
      const { key, properties } = payload;
      const newSchema = cloneDeep(state.schema);
      delete newSchema.properties[key].properties;
      set(newSchema, `properties.${key}.properties`, properties);
      return {
        ...state,
        schema: newSchema
      };
    }
    case ADD_GROUP: {
      const newGroup = {
        ...DEFAULT_GROUP,
        title: payload.title,
      }
      // const newKey = camelCase(payload.title);
      const newSchema = cloneDeep(state.schema);
      const newKey = camelCase(payload.title);
      set(newSchema, `properties.${newKey}`, newGroup);
      return {
        ...state,
        schema: newSchema
      }
    }
    default:
      return state;
  }
};

export default JsonSchemaBuilder;
