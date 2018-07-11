import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Login, Register, UserValidation } from './Login';


class Home extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={UserValidation} />
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </div>
      </HashRouter>
    );
  }
}
ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
