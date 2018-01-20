import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NowPlaying from './NowPlaying';
//import { withRouter } from 'react-router';

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
    console.log('dashboard NP');
    console.log(this.props.nowPlaying);
    return (
      <div>
        <h2>Dashboard </h2>
        {this.renderNowPlaying()}
      </div>
    );
  }
}

function mapStateToProps({ auth, nowPlaying }) {
  return { auth, nowPlaying };
}

export default connect(mapStateToProps, actions)(Dashboard);
//withRouter(Dashboard)
//{this.props.auth.accessToken}
//{this.props.match.params.accessToken}
//{this.props.me ? `email : ${this.props.me.email}` : ''}

/*
<ul>
  <li>hellos</li>
  <li>
    {this.props.auth ? this.props.auth.accessToken : ''}
    {this.props.nowPlaying ? 'got now playing!' : 'no music yet'}
  </li>
</ul>
*/

//this.props.fetch_music(this.props.auth.accessToken);
/*
console.log('dashboard props');
console.log(this.props.auth);
if (this.props.auth && this.state.accessToken === null) {
  this.state = { accessToken: this.props.auth.accessToken };
  this.props.fetch_now_playing();
}
console.log('dashboard NP');
console.log(this.props.nowPlaying);
*/
