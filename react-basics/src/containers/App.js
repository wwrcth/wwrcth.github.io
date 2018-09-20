import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Todos from './Todos';
import Node from './Node';
import * as TodoActions from '../actions';

let categoryId = '';

const App = ({ params, todos, nodes, actions }) => {
  if (params.categoryId) {categoryId = Number(params.categoryId.substring(8));}
  return (
    <div>
    <Todos todos={todos} id={categoryId} actions={actions} params={params} />
    <Node nodes={nodes} id={0} />
  </div>
  ) 
};

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state, params) => {
  return{
    todos: state.todos,
    nodes: state.nodes,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
