import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormJson from 'react-jsonschema-form';
import FormGroup from './components/Form/FormGroup';
import FormTitle from './components/Form/FormTitle';
import Groups from './components/Groups';
import { addGroup } from './redux/JsonSchemaBuilder.action';

class JsonSchemaBuilder extends Component {
  state = {
    showPreview: false,
    showFormGroup: false
  }

  createGroup = (values) => {
    const { dispatch } = this.props;
    dispatch(addGroup(values));
    this.setState({ showFormGroup: false });
  }

  showPreview = () => {
    this.setState({ showPreview: !this.state.showPreview });
  }

  toggleFormGroup = () => {
    const { showFormGroup } = this.state;
    this.setState({
      showFormGroup: !showFormGroup
    })
  }

  render() {
    const { showPreview, showFormGroup } = this.state;
    const { schema } = this.props;
    return (
      <div>
        <FormTitle />
        <Groups />
        {showFormGroup && (
          <FormGroup onSubmit={this.createGroup} handleCancel={this.toggleFormGroup} />
        )}
        {!showFormGroup && Object.keys(schema.properties).length < 4 && (
          <button className="btn btn-primary" type="button" onClick={this.toggleFormGroup}>Add Group</button>
        )}
        <hr />
        <button type="button" onClick={this.showPreview}>Show Preview</button>
        <h1>Preview</h1>
        {schema && showPreview && (
          <FormJson schema={schema} />
        )}
      </div>
    )
  }
}

JsonSchemaBuilder.propTypes = {
  dispatch: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired
}

export default connect(state => ({
  schema: state.JsonSchemaBuilder.schema
}))(JsonSchemaBuilder);
