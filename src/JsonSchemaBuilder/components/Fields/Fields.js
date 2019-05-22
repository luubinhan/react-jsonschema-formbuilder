import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import cloneDeep from 'lodash.clonedeep';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Field from '../Field';
import './Fields.css';
import { updateProperties, removePath, updatePath, updateRequired } from '../../redux/JsonSchemaBuilder.action';

/**
 * a little function to help us with reordering the result
 * @param {*} obj 
 * @param {*} startIndex 
 * @param {*} endIndex 
 */
const reorder = (obj, startIndex, endIndex) => {
  const objKeys = Object.keys(obj);
  let orderedObj = {};
  const [removed] = objKeys.splice(startIndex, 1);
  objKeys.splice(endIndex, 0, removed);
  for (let index = 0; index < objKeys.length; index += 1) {
    const element = objKeys[index];
    orderedObj = {
      ...orderedObj,
      [element]: obj[element]
    }
  }
  return orderedObj;
};

/**
 * Given it some style
 * @param {*} isDragging 
 * @param {*} draggableStyle 
 */
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: '0 0 8px 0',

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#fff',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: '8px 8px 1px 8px',
});

class Fields extends Component {
  /**
   * handle change order of field
   */
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const { schema: { properties }, dispatch, groupKey } = this.props;
    const group = properties[groupKey];
    const newProperties = cloneDeep(group.properties);
    const data = reorder(
      newProperties,
      result.source.index,
      result.destination.index
    );
    dispatch(updateProperties({ key: groupKey, properties: data }));
  }

  /**
   * remove 1 field in group
   * specify by `path`
   */
  handleDelete = (e) => {
    const { path } = e.currentTarget.dataset;
    const { dispatch } = this.props;
    dispatch(removePath(path));
  }

  /**
   * general update function to update store
   */
  updatePath = e => {
    const { dataset: { path }, value } = e.currentTarget;
    const { dispatch } = this.props;
    dispatch(updatePath({ path, value: value }));
  }

  /**
   * helper function to find correct path to update
   * cause type=file||date need update path = `format` not `type`
   */
  updateType = e => {
    const { value,  dataset: { path } } = e.currentTarget;
    const { JsonSchemaBuilder } = this.props;
    const newField = get(JsonSchemaBuilder, path);
    // special case for file, and date, add type = string
    if (value === 'file' || value === 'date') {
      newField.format = value;
      newField.type = 'string';
    } else {
      delete newField.format;
      newField.type = value;
    }
    const { dispatch } = this.props;
    dispatch(updatePath({ path, value: newField }));
  }

  updateRequired = e => {
    const { dataset: { key } } = e.currentTarget;
    const { dispatch, groupKey } = this.props;
    dispatch(updateRequired({ groupKey, key }))
  }

  render() {
    const { schema: { properties }, groupKey } = this.props;
    const group = properties[groupKey];
    if (isEmpty(group.properties)) {
      return null;
    }
    const propertiesKeys = Object.keys(group.properties);
    return (
      <div className="c-fields">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable-1">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {propertiesKeys.map((key, index) => (
                  <Draggable key={key} draggableId={key} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Field
                          {...group.properties[key]}
                          id={key}
                          handleDelete={this.handleDelete}
                          updatePath={this.updatePath}
                          updateType={this.updateType}
                          updateRequired={this.updateRequired}
                          requiredFields={group.required}
                          path={`schema.properties.${groupKey}.properties.${key}`}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}

Fields.propTypes = {
  groupKey: PropTypes.string.isRequired,
  JsonSchemaBuilder: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}

export default connect(state => ({
  JsonSchemaBuilder: state.JsonSchemaBuilder,
  schema: state.JsonSchemaBuilder.schema,
}))(Fields);
