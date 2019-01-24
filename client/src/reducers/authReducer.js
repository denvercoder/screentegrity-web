import { SET_CURRENT_USER, LOADING, NOT_LOADING } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
      case LOADING:
      return {
        ...state,
        loading: true
      };
      case NOT_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state
  }
}
