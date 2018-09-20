import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  align-items: center;
  height: 100%;
`;
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  padding: 0.15em 0.5em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Input = styled.input`
  width: 15em;
  font-size: 0.7em;
  padding: 0.6em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
`;

export default class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePressButton = this.handlePressButton.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault(); 
  }

  handleChange = e => {
    this.setState({ text: e.target.value});
  }

  handlePressButton = e => {
    this.props.onSave(this.state.text);
  } 

  render() {
    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
        <Input type="text" placeholder={this.props.placeholder} onChange={this.handleChange}  />
        <Button type="reset" onClick={this.handlePressButton}>
          Add
        </Button>
      </Form>
    </div>
    )
  }
}