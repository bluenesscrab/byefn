import * as ActionType from '../actions/actiontype.js';

const listInitialState = [];

export default (state = listInitialState, action) => {
  let {type, payload} = action;
  switch(type){
    case ActionType.LIST_ADD:
      return state.concat(payload);

    case ActionType.LIST_REMOVE:
      return state.filter( (v,i) => i!== payload )
      
    default: return state;
  }
}