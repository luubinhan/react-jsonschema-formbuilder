react-jsonschema-formbuilder


## Dependencies

```shell
npm i --save redux react-redux react-beautiful-dnd react-jsonschema-form reactstrap redux-form lodash.get lodash.set  classnames lodash.camelcase lodash.unset lodash.isempty lodash.clonedeep
```

## Setup

Combine with rootReducer of redux

```js
import JsonSchemaBuilder from '../JsonSchemaBuilder/redux/JsonSchemaBuilder.reducer';

const rootReducer = combineReducers({
  form: formReducer,
  JsonSchemaBuilder
});
```