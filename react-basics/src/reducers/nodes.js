const initialState = [
    {
      id: 0,
      childIds: [1, 2],
      text: '',
    },
    {
      id: 1,
      childIds: [],
      text: 'Category 1',
    },
    {
      id: 2,
      childIds: [],
      text: 'Category 2',
    },
  ];

const childIds = (state, action) => {
    switch (action.type) {
      case 'ADD_CHILD':
        return [ action.childId, ...state ];
      case 'REMOVE_CHILD':
        return state.filter(id => id !== action.childId);
      default:
        return state;
    }
  };
  
  const node = (state , action) => {
    switch (action.type) {
      case 'CREATE_NODE':
        return {
          id: action.nodeId,
          childIds: [],
          text: action.text || 'Category',
        };
      case 'EDIT_TODO':
      console.log(state);
        return {
           ...state, 
            text:  action.text };
      case 'ADD_CHILD':
      case 'REMOVE_CHILD':
        return {
          ...state,
          childIds: childIds(state.childIds, action)
        };
      default:
        return state;
    }
  };
  
  const getAllDescendantIds = (state, nodeId) => (
    state[nodeId].childIds.reduce((acc, childId) => (
      [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
    ), [])
  );
  
  const deleteMany = (state, ids) => {
    state = { ...state }
    ids.forEach(id => delete state[id])
    return state
  };
  
  export default (state = initialState, action) => {
    const { nodeId } = action;
    if (typeof nodeId === 'undefined') {
      return state;
    }
  
    if (action.type === 'DELETE_NODE') {
      const descendantIds = getAllDescendantIds(state, nodeId);
      return deleteMany(state, [ nodeId, ...descendantIds ]);
    }
  
    return {
      ...state,
      [nodeId]: node(state[nodeId], action)
    }
  }
  