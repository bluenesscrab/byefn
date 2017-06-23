import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {createStore, combineReducers, bindActionCreators} from 'redux';
import {Provider, connect} from 'react-redux';

import {configureStore} from './store.js'
const store = configureStore();

// types
import * as ActionType from './actions/actiontype.js';

import {listActions}  from './actions';

import Calc from './components/calc.js';


class App extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
  }

  render(){
    let {list, actions} = this.props;
    return(
      <div>
        <h3>App</h3>
        {JSON.stringify(this.props)}
        <div>
          <button onClick={()=>actions.listRemove(0)}>remove</button>
          <input type="text" ref={(input)=>this.input = input}/>
          <button onClick={()=>actions.listAdd(this.input.value)}>Add</button>
          <div>
          {list && list.map((v,i)=><p key={i}>{v}</p>)}
          </div>
        </div>
        <hr />
        <Calc/>
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

const mapDispatchToProps = dispatch => ({
  actions:bindActionCreators(listActions, dispatch), dispatch
});//把 dispatch 作为 App的函数传给TA

const NewApp = connect(mapStateToProps,mapDispatchToProps)(App);
// connect 高阶组建

ReactDOM.render(
  <Provider store={store}>
    <NewApp />
  </Provider>
  , document.getElementById('root'));