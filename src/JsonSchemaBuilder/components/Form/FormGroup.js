import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';
import TextField from './TextField';
import onlyText from './validators/onlyText.validator';

const FormGroup = ({
  pristine,
  submitting,
  handleCancel,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <Field
        label="Group title"
        name="title"
        type="text"
        className="form-control"
        component={TextField}
        validate={[onlyText]}
        required
        maxLength="125"
      />
    </div>
    <button
      type="submit"
      className="btn btn-primary"
      disabled={pristine || submitting}
    >
      Create Group
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

FormGroup.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func
};

FormGroup.defaultProps = {
  handleCancel: null,
}

export default reduxForm({
  form: 'formGroup'
})(FormGroup);

