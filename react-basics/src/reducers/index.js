import { combineReducers } from 'redux';
import todos from './todos';
import nodes from './nodes';

const todoApp = combineReducers({
  todos, nodes
});

export default todoApp;