import { v4 } from 'node-uuid';

const initialState = [
  {
    text: 'Use React',
    completed: false,
    id: 0,
    categoryId: 1,
    description: 'Stage #3 Task',
  },
  {
    text: 'Use Redux',
    completed: false,
    id: 1,
    categoryId: 2,
    description: '',
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        {
          id: v4(),
          completed: false,
          text: action.text,
          categoryId: action.categoryId,
          description: action.description || 'Description',
        },
        ...state,
      ]

    case 'DELETE_TODO':
      return state.filter(todo =>
        todo.id !== action.id
      )

    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text, description: action.description, completed: action.completed } :
          todo
      )

    case 'COMPLETE_TODO':
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case 'COMPLETE_ALL':
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case 'CLEAR_COMPLETED':
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}