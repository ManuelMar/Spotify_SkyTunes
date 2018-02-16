import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NowPlaying from './NowPlaying';
import SearchBar from './SearchBar';
import PlaylistViewer from './PlaylistViewer';
//import { withRouter } from 'react-router';

//TODO: ADD SEARCH BAR for recomended activty

class Dashboard extends Component {
  renderNowPlaying() {
    if (this.props.nowPlaying)
      return <NowPlaying song={this.props.nowPlaying} />;
  }

  render() {
    return (
      <div>
        <SearchBar />
        {this.renderNowPlaying()}
        <PlaylistViewer />
      </div>
    );
  }
}

function mapStateToProps({ auth, nowPlaying }) {
  return { auth, nowPlaying };
}

export default connect(mapStateToProps, actions)(Dashboard);
