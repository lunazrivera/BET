import {
     SET_CURRENT_USER,
     USER_LOADING,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
     isAuthenticated: false,
     user: {},
     loading: false
};

export default function(state = initialState, action) {
     if (action.type === SET_CURRENT_USER) {
          return {
               ...state,
               isAuthenticated: !isEmpty(action.payload),
               user: action.payload
          }
     } else if (action.type === USER_LOADING) {
          return {
               ...state,
               loading: true
          }
     } else {
          return state;
     }
}