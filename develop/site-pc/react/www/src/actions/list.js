import * as ActionType from './actiontype.js';

export function listAdd(text) {
  return {
    type:ActionType.LIST_ADD,
    payload: text
  };
}

export function listRemove(index) {
  // return {
  //   type:ActionType.LIST_REMOVE,
  //   payload: index,
  // };
  
  return (dispatch, getState) => {
    setTimeout(function(){
      dispatch({
        type: ActionType.LIST_REMOVE,
        payload: index
      });
    },2000)
  }

  // return async (dispatch, getState) => {
  //   let list = getState().list;
  //   console.log(list)
  // }
}
