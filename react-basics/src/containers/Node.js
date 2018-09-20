import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import styled from 'styled-components';
import ModalWindow from '../components/ModalWindow';

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 0.1em;
  padding: 0.1em 0.4em;
  border: 1px solid palevioletred;
  border-radius: 3px;
`;
const MainCategoryList = styled.ul`
  list-style-type: none;
  padding: 0; 
  margin: 0;
`;
const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0; 
  margin-left: 10%;
`;
const TaskCategory = styled.div`
  max-width: 300px;
  min-width: 290px;
`;
const MainTaskCategory = styled.div`
  position:absolute;
  top:30%;
  max-width: 50%;
  min-width: 49%;
  max-height: 30em;
  overflow: scroll;
`;
const Buttons = styled.div``;
const TaskInfoWithButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TaskInfo = styled.div``;
const ConnectedNodeLi = styled.li `
margin: 0.5em;
`;

export class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      showModal: false,
    };
    this.handleRenameClick = this.handleRenameClick.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleAddChildClick = this.handleAddChildClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.renderChild = this.renderChild.bind(this);
  }

  handleRenameClick = () => {
    this.setState({ editing: true, showModal: true })
  };

  handleAddTask = (id, text) => {
    if (text.length !== 0) {
      const { addChild, createNode, id } = this.props;
      const childId = createNode(text).nodeId;
      addChild(id, childId);
    }
    this.setState({ showModal: false })
  };

  handleEditTask = (id, text) => {
    if (text.length === 0) {
      const { parentId, id } = this.props;
      const { removeChild, deleteNode,  } = this.props;
      removeChild(parentId, id);
      deleteNode(id);
    } else {
      this.props.editNode(id, text)
    }
    this.setState({ editing: false, showModal: false })
  };

  handleAddChildClick = () => {
    this.setState({ showModal: true });
  };

  handleRemoveClick = e => {
    e.preventDefault()
    
    /*eslint-disable */
    if (confirm('Are you sure?')) {
        const { parentId, id } = this.props;
        const { removeChild, deleteNode,  } = this.props;
        removeChild(parentId, id);
        deleteNode(id);
    }
    /*eslint-enable */
  };

  renderChild = childId => {
    const { id } = this.props;
    return (
      <ConnectedNodeLi key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </ConnectedNodeLi>
    )
  };

  render() {
    const { parentId, childIds, text, id } = this.props;
     if (this.props.nodes === undefined) {
      if (this.state.showModal) {
        if (this.state.editing) {
          return (
            <ModalWindow showModal={this.state.showModal} categoryTitle={text} 
                           onSave={(text) => this.handleEditTask(id, text)} />
          )
        }
        return (
          <ModalWindow showModal={this.state.showModal} categoryTitle={''}
                         onSave={(text) => this.handleAddTask(id, text)} />
        )
      }
        return (
          <div>
            <TaskCategory>
              <TaskInfoWithButtons>
                <TaskInfo>
                  <Link to={'Category' + String(id)} 
                    activeStyle={{
                      color: 'palevioletred', 
                    }} style={{ fontFamily: 'Roboto', color: 'black', textDecoration: 'none', fontSize: '1.1em',}}>  
                    {text}
                  </Link>
                  <Button onClick={this.handleRenameClick}>
                    Rename
                  </Button>
                </TaskInfo>
                <Buttons>
                  <Button onClick={this.handleAddChildClick}>
                    +
                  </Button>
                  {typeof parentId !== 'undefined' &&
                  <Button onClick={this.handleRemoveClick}>
                    ×
                  </Button>
                }
                </Buttons>
              </TaskInfoWithButtons>
              <CategoryList>
                {childIds.map(this.renderChild)}
              </CategoryList>
            </TaskCategory>
  
          </div>
    )
      } else { return (
    <div>
      <MainTaskCategory>
        <MainCategoryList>
          {childIds.map(this.renderChild)}
        </MainCategoryList>
      </MainTaskCategory>
    </div>
  )}
  }
}

function mapStateToProps(state, ownProps) {
  return state.nodes[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
