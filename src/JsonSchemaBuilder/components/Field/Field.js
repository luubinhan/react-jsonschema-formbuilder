import React from 'react';
import PropTypes from 'prop-types';
import onlyText from '../Form/validators/onlyText.validator';
import './Field.css';

class Field extends React.Component {
  state = {
    hasError: false,
    errorMsg: ''
  }

  changeTitle = (e) => {
    const { updatePath } = this.props;
    const { value } = e.currentTarget;
    const testedValue = onlyText(value);
    if (!testedValue) {
      updatePath(e);
      this.setState({
        hasError: false,
        errorMsg: ''
      })
    } else {
      this.setState({
        hasError: true,
        errorMsg: testedValue
      })
    }
  }

  render() {
    const {
      hasError,
      errorMsg
    } = this.state;
    const {
      id,
      title,
      description,
      type,
      format,
      handleDelete,
      requiredFields,
      updateType,
      updateRequired,
      path
    } = this.props;
    return (
      <div className="c-field d-flex">
        <div className="field-title pr-2">
          <label htmlFor={`${path}.title`}>
            Title
          </label>
          <input
            id={`${path}.title`}
            name={`${path}.title`}
            type="text"
            className={`form-control ${hasError && 'is-invalid'}`}
            value={title}
            data-path={`${path}.title`}
            onChange={this.changeTitle}
            required
            maxLength="125"
          />
          {hasError && (
            <div className="invalid-feedback">
              {errorMsg}
            </div>
          )}
        </div>
        <div className="field-type pr-2">
          <label htmlFor={`${path}.type`}>
            Type
          </label>
          <select
            className="custom-select"
            required
            data-path={`${path}`}
            id={`${path}.type`}
            value={format || type}
            onChange={updateType}
            name={`${path}.type`}
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="file">File</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="field-required pr-2">
          <label htmlFor={`${path}.required`}>
            Required
          </label>
          <div>
            <div className="custom-control custom-switch">
              <input
                data-key={id}
                name={`${path}.required`}
                type="checkbox"
                onChange={updateRequired}
                checked={(requiredFields.indexOf(id) > -1)}
                className="custom-control-input"
                id={`${path}.required`}
              />
              <label className="custom-control-label" htmlFor={`${path}.required`}>Required</label>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <button
            type="button"
            data-key={id}
            data-path={path}
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }  
}

Field.propTypes = {
  title: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateType: PropTypes.func.isRequired,
  updateRequired: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  format: PropTypes.string,
  requiredFields: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired
}

Field.defaultProps = {
  description: "",
  format: "",
}

export default Field;
