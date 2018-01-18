import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Dashboard from './Dashboard';

const Landing = () => {
  return <div>Landing</div>;
};
/*
const Dashboard = () => {
  return <div>Dashboard</div>;
};*/

class App extends Component {
  componentDidMount() {
    this.props.fetch_user();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route
              path="/user/:accessToken/:refreshToken"
              component={Dashboard}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
