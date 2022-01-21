import { SET_INPUT, SET_IMPORT } from '../actions'

const input_reducer = (state, action) => {
  switch (action.type) {
    case SET_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
    case SET_IMPORT:
      return {
        ...state,
        importedData: action.payload,
      }
    default:
      return state
  }
}

export default input_reducer
