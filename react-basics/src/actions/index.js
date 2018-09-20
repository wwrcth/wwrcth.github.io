import { v4 } from 'node-uuid';

let categoryId = 3;

export const addTodo = (text, categoryId, description) => ({
    type: 'ADD_TODO', 
    id: v4(),
    text,
    categoryId,
});

export const deleteTodo = (id) => ({ 
    type: 'DELETE_TODO', 
    id,
});

export const editTodo = (id, text, description, completed) => ({ 
    type: 'EDIT_TODO', 
    id, 
    text, 
    description,
    completed
});

export const completeTodo = (id) => ({ 
    type: 'COMPLETE_TODO', 
    id,
});

export const completeAll = () => ({ 
    type: 'COMPLETE_ALL',
});

export const clearCompleted = () => ({ 
    type: 'CLEAR_COMPLETED',
});
  
export const createNode = (text) => ({
    type: 'CREATE_NODE',
    nodeId: categoryId++,
    text,
});

export const editNode = (nodeId, text) => ({ 
    type: 'EDIT_TODO', 
    nodeId, 
    text, 
});
  
export const deleteNode = (nodeId) => ({
    type: 'DELETE_NODE',
    nodeId
});
  
export const addChild = (nodeId, childId) => ({
    type: 'ADD_CHILD',
    nodeId,
    childId,
});
  
export const removeChild = (nodeId, childId) => ({
    type: 'REMOVE_CHILD',
    nodeId,
    childId
});