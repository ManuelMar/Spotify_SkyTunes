import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PlaylistViewer from './PlaylistViewer';

import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';

/*
const Landing = () => {
  return <div>Landing</div>;
};
*/
/*
const Dashboard = () => {
  return <div>Dashboard</div>;
};

color : #d5d5d5
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#d5d5d5';

    this.props.fetch_user().then(res => {
      //console.log('DONE FETCHING USER');
      this.props.fetch_now_playing().then(() => {
        //console.log('got now playing');
        //this.setState({ done: true });
      });
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/music" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ track, nowPlaying, next }) {
  return { track, nowPlaying, next };
}

export default connect(mapStateToProps, actions)(App);
