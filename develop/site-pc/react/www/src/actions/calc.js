import * as ActionType from './actiontype.js';

export function calc(text) {
  return {
    type:ActionType.CALCE_GET,
    payload: text
  };
}
