import React from 'react';
import classNames from 'classnames';

const TextField = ({
  input,
  label,
  type,
  meta: {
    touched,
    error,
    warning
  }
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div>
        <input
          {...input}
          type={type}
          className={classNames('form-control white', { 'is-invalid': touched && error })}
        />
        {touched && ((error && <div className="invalid-feedback">{error}</div>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

export default TextField;
