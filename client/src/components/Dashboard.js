import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
//import { withRouter } from 'react-router';

class Dashboard extends Component {
  componentDidMount() {
    //console.log(this.props.match.params);
    //const { accessToken, refreshToken } = this.props.match.params;
    //this.props.set_spotify_tokens(accessToken, refreshToken);
    //this.props.get_me(accessToken);
  }

  render() {
    //this.props.fetch_music(this.props.auth.accessToken);
    console.log('dashboard props');
    console.log(this.props.auth);
    return (
      <div>
        <h1>Dashboard</h1>
        <ul>
          <li>hellos</li>
          <li>
            {this.props.auth ? this.props.auth.accessToken : ''}
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
//withRouter(Dashboard)
//{this.props.auth.accessToken}
//{this.props.match.params.accessToken}
//{this.props.me ? `email : ${this.props.me.email}` : ''}
