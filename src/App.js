import React, { Component } from 'react';
import { Provider } from 'react-redux';
import storeConfig from './storeConfig/reduxStore.config';
import JsonSchemaBuilder from './JsonSchemaBuilder';

const store = storeConfig();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <JsonSchemaBuilder />
      </Provider>
    );
  }
}

export default App;
