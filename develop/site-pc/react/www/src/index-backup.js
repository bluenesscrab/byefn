import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';

import {configureStore} from './store.js'
const store = configureStore();


// types
const Types = {
  ADD:'ADD',
  REMOVE: 'REMOVE',
  CACLE: 'CACLE'
};

const initialState = {
  list: [],
  calc:{
    btnlist:[9, 8, 7, 6, 5, 4, 3, 2, 1, '.', 0, '='],
    calc:['+', '-', '×', '÷'],
    val:0,
    bl:true,
    calcs:'',
    left:0
  }
};

// const reducer = (state = initialState, action) => {
//   let {type, payload} = action;
  
//   switch(type){
//     case Types.ADD:
//       return Object.assign({}, state, {
//         list: state.list.concat(payload)
//       });
    
//     case Types.REMOVE:
//       return Object.assign({}, state, {
//         list: state.list.filter( (v,i) => i!== payload )
//       });

//     case Types.CACLE:
//       let obj = {};
//       if( !isNaN(Number(payload)) ){
//         let num = Number(state.calc.bl ? `${state.calc.val}${payload}` : payload);
//         obj =  Object.assign({}, state, {
//           calc:{
//             val:num,
//             bl:true,
//             btnlist:state.calc.btnlist ,
//             calc:state.calc.calc,
//             calcs:state.calc.calcs,
//             left:state.calc.left,
//           }
//         });
//       }else{
//         if(state.calc.calcs){
//           let num = eval(state.calc.left+ state.calc.calcs.replace('×','*').replace('÷','/') +state.calc.val);
//           payload = payload === '=' ?'':payload;
//           obj = Object.assign({}, state, {
//             calc:{
//               left: num,
//               val: num,
//               bl:false,
//               calcs:payload,
//               btnlist:state.calc.btnlist,
//               calc:state.calc.calc,
//             }
//           });
//         }else{
//           payload = payload === '=' ?'':payload;
//           obj =  Object.assign({}, state, {
//             calc:{
//               left:state.calc.val,
//               bl:false,
//               calcs:payload,
//               btnlist:state.calc.btnlist ,
//               calc:state.calc.calc,
//               val:state.calc.val,
//             }
//           });
//         }
//       }
//       return obj;

//     default: return state
//   }
// }

// const store = createStore(reducer);

import Calc from './components/calc.js';


//定义一个action
const add = text => ({
  type: Types.ADD,
  payload: text
});
const remove = index => ({
  type: Types.REMOVE,
  payload: index
});
const calc = val => ({
  type: Types.CACLE,
  payload: val
});


const mapStateToPropsCalc = (state) =>{
  return {
    all: state,
    calc: state.calc
  }
};//把 state 传给 App作为props

const mapDispatchToPropsCalc = dispatch => (
  {
    actions:{
      calc:(text)=>dispatch(calc(text)),
    }
  }
);//把 dispatch 作为 App的函数传给TA

const NewCalc = connect(mapStateToPropsCalc,mapDispatchToPropsCalc)(Calc);
// connect 高阶组建


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let {list, actions} = this.props;
    console.log(this.props);
    return(
      <div>
        <h3>App</h3>
        {JSON.stringify(this.props)}
        <div>
          <button onClick={()=>actions.remove(0)}>remove</button>
          <input type="text" ref={(input)=>this.input = input}/>
          <button onClick={()=>actions.add(this.input.value)}>Add</button>
          <div>
          {list && list.map((v,i)=><p key={i}>{v}</p>)}
          </div>
        </div>
        <hr />
        <NewCalc/>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    all: state,
    list: state.list
  }
};//把 state 传给 App作为props

const mapDispatchToProps = dispatch => (
  {
    actions:{
      add:(text)=>dispatch(add(text)),
      remove:(text)=>dispatch(remove(text)),
    }
  }
);//把 dispatch 作为 App的函数传给TA

const NewApp = connect(mapStateToProps,mapDispatchToProps)(App);
// connect 高阶组建

ReactDOM.render(
  <Provider store={store}>
    <NewApp />
  </Provider>
  , document.getElementById('root'));