import React, { Component } from 'react';
import TodoEditTaskInput from './TodoEditTaskInput';
import styled from 'styled-components';

const Task = styled.li`
  padding: 1em;
  border: 1px solid black;
  &:not(:first-child) {
    border-top: 0;
  }
`;
const TaskTitle = styled.label``;
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 0.1em;
  padding: 0.25em 0.6em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Input = styled.input`
  margin-right: 2em;
`;
const TaskInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;
const TaskTitleWithComplete = styled.div`
  text-overflow: ellipsis;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
`;

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handlePressButton = this.handlePressButton.bind(this);
  }

  handlePressButton = () => {
    this.setState({ editing: true })
  };

  handleSave = (id, text, description, completed) => {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text, description, completed);
    }
    this.setState({ editing: false })
  };

  render() {
    const { todo, completeTodo } = this.props;
    let element;
    // let categoryId = 'Category' + String(todo.categoryId);
    if (this.state.editing ) {
      element = (
        <TodoEditTaskInput text={todo.text} description={todo.description} completed={todo.completed} categoryId={todo.categoryId}
                       editing={this.state.editing}
                       onSave={(text, description, completed) => {this.handleSave(todo.id, text, description, completed)}} />
      )
    } else {
      element = (
        <div>
          <TaskInfo>
            <TaskTitleWithComplete>
              <Input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => completeTodo(todo.id)} />
              <TaskTitle>
                {todo.text} 
              </TaskTitle>
            </TaskTitleWithComplete>
        
            <Button onClick={this.handlePressButton}>
              Edit
            </Button>
          </TaskInfo>
        </div>
      )
    };

    return (
      <Task>
        {element}
      </Task>
    )
  }
};