import React from 'react';
import PropTypes from 'prop-types';
import onlyText from '../Form/validators/onlyText.validator';
import Fields from '../Fields';

class Group extends React.Component {
  state = {
    hasError: false,
    errorMsg: ''
  }

  changeTitle = (e) => {
    const { changeTitle } = this.props;
    const { value } = e.currentTarget;
    const testedValue = onlyText(value);
    if (!testedValue) {
      changeTitle(e);
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
      id,
      title,
      handleDelete,
      handleAddField,
      path,
      enableAdd
    } = this.props;
    const {
      hasError,
      errorMsg
    } = this.state;
    return (
      <div className="c-group card mb-4">
        <div className="group-title card-header d-flex">
          <div>
            <label htmlFor={`${path}.title`}>
              Group title
            </label>
            <input
            className={`form-control ${hasError && 'is-invalid'}`}
              type="text"
              required
              maxLength="125"
              name={`${path}.title`}
              data-path={`${path}.title`}
              value={title}
              onChange={this.changeTitle}
            />
            {hasError && (
              <div className="invalid-feedback">
                {errorMsg}
              </div>
            )}
          </div>
          <div className="ml-auto">
            <button
              type="button"
              data-path={path}
              data-key={id}
              onClick={handleDelete}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="card-body" id={path}>
          <Fields groupKey={id} />
          {enableAdd && (
            <div className="text-right pt-3">
              <button
                type="button"
                data-key={id}
                data-path={path}
                onClick={handleAddField}
                className="btn btn-primary"
              >
                Add Field
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Group.propTypes = {
  title: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAddField: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  enableAdd: PropTypes.bool.isRequired,
}

export default Group;

