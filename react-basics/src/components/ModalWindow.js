import React, { Component } from 'react';
import  ReactModal  from 'react-modal';
import styled from 'styled-components';

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 0.1em;
  padding: 0.1em 0.4em;
  border: 1px solid palevioletred;
  border-radius: 3px;
`;
const TitleInput = styled.input`
  padding: 0.6em;
	margin: 0.5em;
	width: 80%;
	font-size: 1em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em;
`;

export default class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal,
      categoryTitle: this.props.categoryTitle,
      initialCategoryTitle: this.props.categoryTitle,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSaveModalButton = this.handleSaveModalButton.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);

  }
      
  handleCloseModal () {
    this.props.onSave(this.state.initialCategoryTitle);
    this.setState({ showModal: false });
  }
    
  handleSaveModalButton () {
    this.props.onSave(this.state.categoryTitle);
    this.setState({ showModal: false });
  }

  handleTitleChange = e => {
    this.setState({ categoryTitle: e.target.value });
  }

  render() {
    return(
      <div>
        <ReactModal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} shouldCloseOnOverlayClick={true} ariaHideApp={false}
            style={{
              overlay: {
                maxWidth: '25%',
                maxHeight: '30%',
                top: '9.5em',
                left: '-2em',
              },
              content: {
                
              }
            }}>
        <TitleInput type="text" value={this.state.categoryTitle} onChange={this.handleTitleChange} />
        <Buttons>
          <Button onClick={this.handleSaveModalButton}>Save</Button>
          <Button onClick={this.handleCloseModal}>Cancel</Button>
        </Buttons>   
      </ReactModal>
    </div>
  )
}
};