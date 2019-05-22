import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends React.Component {
  render() {
    const { target } = this.props;
    if (!target) {
      return null;
    }
    const haveTarget = document.getElementById(target);
    return Boolean(haveTarget) ? ReactDOM.createPortal(
      this.props.children,
      haveTarget
    ) : null
  }
}

Portal.propTypes = {
  target: PropTypes.string.isRequired,
}

export default Portal;
