import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {calcActions}  from '../actions';

class Calc extends Component{
  constructor(props){
    super(props);
  }

  getVal(val){
    let { actions } = this.props;
    actions.calc(val);
  }

  render(){
    let {calc, actions} = this.props;
    return (
      <div>
        <hr/>
          {JSON.stringify(calc)}
        <hr/>
        <div className="calcs">{calc.val}</div>
        <hr/>

        { calc.btnlist.map((v,i) => <span key={i}><input onClick={()=>{ this.getVal(v) }} className="btn" type="button" value={v}/>{i!=0&&(i+1)%4==0 ? <br/>:''}</span> ) }
      </div>
    );
  }
}

import * as ActionType from '../actions/actiontype.js';

const mapStateToPropsCalc = (state) =>{
  return {
    all: state,
    calc: state.calc
  }
};//把 state 传给 App作为props

const mapDispatchToPropsCalc = dispatch => ({
  // actions:{
  //   calc:(text)=>dispatch(calc(text)),
  // }
  actions:bindActionCreators(calcActions, dispatch), dispatch
});//把 dispatch 作为 App的函数传给TA

export default connect(mapStateToPropsCalc,mapDispatchToPropsCalc)(Calc);
// connect 高阶组建

