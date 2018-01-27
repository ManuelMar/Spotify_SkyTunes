import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NowPlaying from './NowPlaying';
//import { withRouter } from 'react-router';

//TODO: ADD SEARCH BAR for activty

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderNowPlaying() {
    if (this.props.nowPlaying)
      return <NowPlaying song={this.props.nowPlaying} />;
  }

  render() {
    return (
      <div>
        {this.renderNowPlaying()}
      </div>
    );
  }
}

function mapStateToProps({ auth, nowPlaying }) {
  return { auth, nowPlaying };
}

export default connect(mapStateToProps, actions)(Dashboard);
