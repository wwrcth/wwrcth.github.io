import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: palevioletred;
	font-size: 1em;
	margin: 1em;
  padding: 0.15em 0.5em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Form = styled.form``;
const Buttons = styled.section`
  display: flex;
	flex-direction: row;
	justify-content: flex-end;
  align-items: center;
  height: 100%;
`;
const TaskInfo = styled.section`
  display: flex;
  flex-direction: column;
`;
const CompleteInput = styled.div`
	display:flex;
	flex-direction: row;
	align-items: center;
	height: 100%;
	margin: 0.5em 0.5em;
`;
const TitleInput = styled.input`
  padding: 0.6em;
	margin: 0.5em;
	width: 40%;
	font-size: 1em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
`;
const DescriptionInput = styled.input`
  padding: 0.6em;
	margin: 0.5em;
	font-size: 0.7em;
	height: 4em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
`;


export default class TodoEditTaskInput extends Component {
	constructor(props) {
    super(props);
    this.state = {
      text: this.props.text || '',
    	description: this.props.description || '',
    	completed: this.props.completed || false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
		this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
		this.handleCompletedChange = this.handleCompletedChange.bind(this);
	}
	
  handleNameChange = e => {
    this.setState({ text: e.target.value });
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  }

  onCancelButtonClick = e => {
    this.props.onSave(this.props.text, this.props.description, this.props.completed);
	}
	
	onSubmitButtonClick = e => {
    this.props.onSave(this.state.text, this.state.description, this.state.completed);
	}
	
	handleCompletedChange = e => {
    this.setState({ completed: e.target.checked });
  }

  render() {
  return (
  	<div>
        <Form>
          <Buttons>
            <Button onClick={this.onSubmitButtonClick}>
              Save changes
            </Button>
            <Button onClick={this.onCancelButtonClick}>
              Cancel
            </Button>
          </Buttons>
          <TaskInfo>
						<TitleInput type="text" value={this.state.text} onChange={this.handleNameChange} />
						<CompleteInput>
              <input type='checkbox' checked={this.state.completed} onChange={this.handleCompletedChange} />
							<label>Done</label>
						</CompleteInput>
            <DescriptionInput type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
          </TaskInfo>
        </Form>
    </div>
    )
  }
}