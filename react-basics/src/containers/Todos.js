import React, { Component } from 'react';
import TodoInput from '../components/TodoInput';
import TodoFilter from '../components/TodoFilter';
import TodoSearchFilter from '../components/TodoSearchFilter';
import { all, completed, active } from '../constants/TodoFilters';
import TodoItem from '../components/TodoItem';
import Progress from 'react-progressbar';
import _ from 'lodash';
import styled from 'styled-components';

const PageHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;
const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
`;
const Filters = styled.div`
  font-family: 'Roboto', sans-serif;
  justify-content: space-between;
  color: palevioletred;
  font-size: 1.2em;
  margin: 1em;
  padding: 1em 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;
const CompleteFilter = styled.div`
  margin-right: 1em;
`;
const AddSection = styled.section`
  margin: 1em 1em 1em 0;
  justify-content: space-between;
  padding: 0em 0em;
  font-family: 'Roboto', sans-serif;
  font-size: 1.1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;
const TaskList = styled.ul`
  list-style-type: none;
  
  padding: 0; 
`;
const TaskSection = styled.section`
  position:absolute;
  top:30%;
  left: 50%;
  max-width: 50%;
  min-width: 49%;
  max-height: 30em;
  font-family: 'Roboto', sans-serif;
  font-size: 1.1em;
  overflow: scroll;
`;

const TODO_FILTERS = {
  [all]: () => true,
  [active]: todo => !todo.completed,
  [completed]: todo => todo.completed
};

let searchValue = '';

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: all,
      searchFilter: '',
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleSearchQueryShow = this.handleSearchQueryShow.bind(this);
    this.renderTodoWithCategory = this.renderTodoWithCategory.bind(this);
    this.renderTodoCompleteFilter = this.renderTodoCompleteFilter.bind(this);
    this.renderTodoSearchFilter = this.renderTodoSearchFilter.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.handleSaveCategory = this.handleSaveCategory.bind(this);
  }

  handleShow = filter => {
    this.setState({ filter });
  };

  handleSearchQueryShow = searchFilter => {
    this.setState({ searchFilter });
    searchValue = searchFilter;
  };

  renderTodoWithCategory = (categoryId) => {
    const { todos } = this.props;
    return todos.filter(todo => todo.categoryId === categoryId);
  };

  renderTodoCompleteFilter = () => {
    const { todos } = this.props;
    const { filter } = this.state;

    if (todos.length) {
      return (
        <div>
        <TodoFilter 
                filter={filter}
                onShow={this.handleShow} />
        </div>
      )
    }
  };

  renderTodoSearchFilter = () => {
    const { todos } = this.props;
    if (todos.length) {
      return (
        <div>
        <TodoSearchFilter 
                onShow={this.handleSearchQueryShow} />
        </div>
      )
    }
  };

  handleSaveTask = text => {
    const { id } = this.props;
    if (text.length !== 0) {
      this.props.actions.addTodo(text, id)
    }
  };

  handleSaveCategory = text => {
    if (text.length !== 0) {
      const childId = this.props.actions.createNode(text).nodeId;
      this.props.actions.addChild(0, childId);
    }
  };

  render() {
    const { actions, id } = this.props
    const { filter } = this.state;
    const todoWithCategory = this.renderTodoWithCategory(id);
    const completedCount = todoWithCategory.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
    let todoBar;
    (todoWithCategory.length) ? todoBar = completedCount * 100 / todoWithCategory.length : todoBar = 100;

    const filteredTodos = todoWithCategory.filter(TODO_FILTERS[filter]);
    let searchFilteredTodos;
    if (searchValue) {
      searchFilteredTodos = _.filter(filteredTodos, todo =>[todo.text.toLowerCase()].includes(searchValue.toLowerCase()));
      if (!searchFilteredTodos.length) {
        searchFilteredTodos = [];
      }
    } else {
      searchFilteredTodos = filteredTodos;
    }

    let taskInput;
    if (id) {
      taskInput = (
        <TodoInput newTodo
        onSave={this.handleSaveTask}
        placeholder="What needs to be done?" />
      )
    } 
    
    return (
      <div>
        <PageHeader>
          <Title>To-Do List</Title>
          <Filters>
            <CompleteFilter>
            {this.renderTodoCompleteFilter()}
            </CompleteFilter>
            {this.renderTodoSearchFilter()}
          </Filters>
        </PageHeader>
        <Progress completed={todoBar} />
        <AddSection>
          <TodoInput newCategory
                       onSave={this.handleSaveCategory}
                       placeholder="Enter category title" />
          {taskInput}
        </AddSection>
        <TaskSection>
          <TaskList className="todo-list">
                        {searchFilteredTodos.map(todo =>
                          <TodoItem key={todo.id} todo={todo} {...actions} />
                        )}
          </TaskList>
        </TaskSection>
        
      </div>
    )
  }
};