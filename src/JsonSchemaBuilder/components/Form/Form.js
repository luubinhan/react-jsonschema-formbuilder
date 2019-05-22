import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';
import TextField from './TextField';
import onlyText from './validators/onlyText.validator';

const Form = ({
  pristine,
  submitting,
  handleSubmit,
  handleCancel
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <Field
        label="Title"
        name="title"
        type="text"
        className="form-control"
        component={TextField}
        validate={[onlyText]}
        required
        maxLength="125"
      />
    </div>
    <div style={{ display: 'none' }} className="form-group">
      <Field
        placeholder="Description"
        name="description"
        type="text"
        className="form-control"
        component="textarea"
      />
    </div>
    <div className="form-group">
      <label htmlFor="filedType">Type</label>
      <Field name="type" id="filedType" className="custom-select" required component="select">
        <option />
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="file">File</option>
        <option value="date">Date</option>
      </Field>
    </div>
    <div className="form-group">
      <Field
        name="required"
        id="required"
        component="input"
        type="checkbox"
      />
      <label htmlFor="required">Required</label>
    </div>
    <button
      type="submit"
      className="btn btn-primary"
      disabled={pristine || submitting}
    >
      Create Field
    </button>
    {handleCancel && (
      <button
        type="button"
        className="btn btn-outline-secondary ml-2"
        onClick={handleCancel}
      >
        Cancel
      </button>
    )}
    
  </form>
)

Form.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func
};

Form.defaultProps = {
  handleCancel: null
};

export default reduxForm({
  form: 'formField'
})(Form);
