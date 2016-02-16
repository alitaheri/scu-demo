/// <reference path="../typings/main.d.ts" />

import * as React from 'react';
import * as ReactDom from 'react-dom';

import shallowCompare = require('react-addons-shallow-compare');

const style = { 
  display: 'inline-block', 
  border: '1px solid black', 
  padding: 10, 
  margin: 10,
  transition: 'all 0.3s',
};

class BrokenLayoutComponent extends React.Component<any, any> {
  shouldComponentUpdate(nextProps: any) {
    return false;
  }

  render() {
    setTimeout(() => {(this.refs as any).box.style.backgroundColor = 'red'});
    setTimeout(() => {(this.refs as any).box.style.backgroundColor = 'white'}, 500);
    return (
      <div ref='box' style={style}>BrokenLayoutComponent's children: {this.props.children}</div>
    );
  }
}

class SlowLayoutComponent extends React.Component<any, any> {
  shouldComponentUpdate(nextProps: any) {
    return true;
  }

  render() {
    setTimeout(() => {(this.refs as any).box.style.backgroundColor = 'red'});
    setTimeout(() => {(this.refs as any).box.style.backgroundColor = 'white'}, 500);
    return (
      <div ref='box' style={style}>SlowLayoutComponent's children: {this.props.children}</div>
    );
  }
}

class FastLayoutComponent extends React.Component<any, any> {
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    setTimeout(() => {(this.refs as any).box.style.backgroundColor = 'red'});
    setTimeout(() => {(this.refs as any).box.style.backgroundColor = 'white'}, 500);
    return (
      <div ref='box' style={style}>FastLayoutComponent's children: {this.props.children}</div>
    );
  }
}

class App extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ count: this.state.count + 1 }) } > Add Count </button>
        <button onClick={() => this.setState({ count: this.state.count }) } > Fake Change </button><br/>
        Directly nested value type: <BrokenLayoutComponent>{this.state.count}</BrokenLayoutComponent><br/>
        Directly nested value type: <SlowLayoutComponent>{this.state.count}</SlowLayoutComponent><br/>
        Directly nested value type: <FastLayoutComponent>{this.state.count}</FastLayoutComponent><br/>
        Indirectly nested value type: <BrokenLayoutComponent><span>{this.state.count}</span></BrokenLayoutComponent><br/>
        Indirectly nested value type: <SlowLayoutComponent><span>{this.state.count}</span></SlowLayoutComponent><br/>
        Indirectly nested value type: <FastLayoutComponent><span>{this.state.count}</span></FastLayoutComponent><br/>
      </div>
    );
  }
}

ReactDom.render(<App/>, document.getElementById('container'));
