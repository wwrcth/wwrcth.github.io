import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  padding: 0.15em 0.5em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Input = styled.input`
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
const Form = styled.form`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default class TodoSearchFilter extends Component {
  static PropTypes = {
    onShow: PropTypes.func.isRequired,
  };

  render() {
    const { onShow } = this.props;
    const onClickResetButton = () => onShow('');
    const onChange_ = e => onShow(e.target.value);
    return (
      <div>
        <Form>
        <Input  type="text" placeholder={'Search'} onChange={onChange_} />
        <Button type="reset" onClick={onClickResetButton}>
          x
        </Button>
      </Form>
      </div>
    )
  };
};
