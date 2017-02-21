
import { Component } from 'react'
import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router';
import { Router, Route, hashHistory } from 'react-router';

const App = React.createClass({
  render(){
    return (
      <Router history={hashHistory}>
        <Route path='/' component= {Home} />
        <Route path='/About' component= {About} />
        <Route path='/Mys' component= {Mys} />
      </Router>
    )
  }
})

const Home = React.createClass({
  render(){
    return (
      <div><Link to='/About'>Home</Link></div>
    )
  }
})

const About = React.createClass({
  render(){
    return (
     <div> <Link to='/Mys'>Aoubt me</Link> </div>
    )
  }
})

const Mys = React.createClass({
  render(){
    return (
      <div>I am Zhang</div>
    )
  }
})

render(
    <App/>,
    document.querySelector('#content')
);