import React, { Component } from 'react';
import { connect } from 'react-redux';
import Group from '../Group';
import Portal from '../Portal';
import Form from '../Form';
import { removePath, addField, updatePath } from '../../redux/JsonSchemaBuilder.action';

class Groups extends Component {
  state = {
    activeGroup: '',
    path: ''
  }

  createField = (values) => {
    const { dispatch } = this.props;
    const { activeGroup } = this.state;
    dispatch(addField({ key: activeGroup, property: values }));
    this.setState({ activeGroup: '' });
  }

  changeTitle = (e) => {
    const { dataset: { path }, value } = e.currentTarget;
    const { dispatch } = this.props;
    dispatch(updatePath({ path, value }));
  }

  removeActive = (e) => {
    this.setState({ activeGroup: '' });
  }

  handleDeleteGroup = (e) => {
    const { path } = e.currentTarget.dataset;
    const { dispatch } = this.props;
    dispatch(removePath(path));
  }
  
  handleAddField = (e) => {
    const { key, path } = e.currentTarget.dataset;
    this.setState({ activeGroup: key.toString(), path });
  }

  render() {
    const { schema: { properties } } = this.props;
    const { activeGroup, path } = this.state;
    return (
      <div className="groups">
        {Boolean(activeGroup) && (
          <Portal target={path}>
            <Form onSubmit={this.createField} handleCancel={this.removeActive} />
          </Portal>
        )}
        {Object.keys(properties).map(id => (
          <Group
            key={id}
            id={id}
            title={properties[id] && properties[id].title}
            handleDelete={this.handleDeleteGroup}
            handleAddField={this.handleAddField}
            changeTitle={this.changeTitle}
            path={`schema.properties.${id}`}
            enableAdd={!Boolean(activeGroup)}
          />
        ))
        }
      </div>
    )
  }
}

export default connect(state => ({
  schema: state.JsonSchemaBuilder.schema,
}))(Groups);

