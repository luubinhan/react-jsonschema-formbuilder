import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import JsonSchemaBuilder from '../JsonSchemaBuilder/redux/JsonSchemaBuilder.reducer';

const rootReducer = combineReducers({
  form: formReducer,
  JsonSchemaBuilder
});

export default rootReducer;
