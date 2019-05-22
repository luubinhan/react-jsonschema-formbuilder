import {
  ADD_GROUP,
  ADD_PROPERTY,
  UPDATE_PROPERTIES,
  UPDATE_PATH,
  REMOVE_PATH,
  UPDATE_REQUIRED
} from './JsonSchemaBuilder.reducer.js';

export const addField = (payload) => ({ type: ADD_PROPERTY, payload });

export const updateProperties = (payload) => ({ type: UPDATE_PROPERTIES, payload });

export const addGroup = (payload) => ({ type: ADD_GROUP, payload });

export const updatePath = (payload) => ({ type: UPDATE_PATH, payload });

export const removePath = (payload) => ({ type: REMOVE_PATH, payload });

export const updateRequired = (payload) => ({ type: UPDATE_REQUIRED, payload });

