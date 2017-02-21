import { Component } from 'react';
import React from 'react'

import { Router, Route, hashHistory } from 'react-router';

import { Home , About } from './page';

class App extends Component{
  render(){
   
    return (<Router history={ hashHistory }>
      <Route path="/" component={ Home }/>
      <Route path="/about" component={ About }/>
    </Router>);
  }
}
export { App };