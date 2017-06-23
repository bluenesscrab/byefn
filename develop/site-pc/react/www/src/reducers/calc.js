import * as ActionType from '../actions/actiontype.js';

const calcInitialState = {
  btnlist:[7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '÷', '='],
  val:0,
  bl:true,
  calcs:'',
  left:0
};

export default (state = calcInitialState, action) => {
  const {type, payload} = action;
  switch (type){
    case ActionType.CALCE_GET:
      if( !isNaN(Number(payload)) ){
        let num = Number(state.bl ? `${state.val}${payload}` : payload);
        return Object.assign({}, state, {
          val:num,
          bl:true,
        });
      }else{
        if(state.calcs){
          let num = eval(state.left+ state.calcs.replace('×','*').replace('÷','/') +state.val);
          let calcs = payload === '=' ?'':payload;
          return Object.assign({}, state, {
            left: num,
            val: num,
            bl:false,
            calcs:calcs,
          });
        }else{
          let calcs = payload === '=' ?'':payload;
          return Object.assign({}, state, {
            left:state.val,
            bl:false,
            calcs:calcs,
          });
        }
      }
    default: return state;
  }
}