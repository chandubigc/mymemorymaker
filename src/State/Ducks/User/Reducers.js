import { combineReducers } from 'redux';
import types from './Types';

const userReducer = function ( state = {
  is_loggedin: false,
}, action) {
  switch (action.type) {
    case types.FETCH_USER_COMPLETED: {
      for (let p of action.payload) {
        return {...p};
      }
    }
    default:
      return state;
  }
};



export default combineReducers({
  current_user: userReducer,
});
