import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePath } from '../../redux/JsonSchemaBuilder.action';
import onlyText from './validators/onlyText.validator';

const FormTitle = ({
  title,
  dispatch
}) => {
  const changeTitle = (e) => {
    const { name, value } = e.currentTarget;
    const testedValue = onlyText(value);
    if (!testedValue) {
      dispatch(updatePath({ path: name, value: value }));
    }
  }
  return (
    <div className="form-group">
      <label htmlFor="schema.title">
        Form Title
      </label>
      <input
        type="text"
        id="schema.title"
        value={title}
        required
        maxLength="125"
        name="schema.title"
        className="form-control"
        onChange={changeTitle}
      />
    </div>
  );
} 

FormTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default connect(state => ({
  title: state.JsonSchemaBuilder.schema.title
}))(FormTitle);

