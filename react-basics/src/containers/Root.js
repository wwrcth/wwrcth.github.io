import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import Node from './Node';
import TodoItem from '../components/TodoItem';

const Root = ({ store }) => (
    <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <Route path="/(:categoryId)" component={Node} >
          <Route path="/(:categoryId)/(:text)" component={TodoItem} />
        </Route>
      </Route>
        
      </Router>
    </Provider>
  );

Root.propTypes = {
    store: PropTypes.object.isRequired
  };

export default Root; 