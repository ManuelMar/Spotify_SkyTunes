import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router';

class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props.match.params);
    const { accessToken, refreshToken } = this.props.match.params;
    this.props.set_spotify_tokens(accessToken, refreshToken);
    this.props.get_me(accessToken);
  }

  render() {
    //this.props.fetch_music(this.props.auth.accessToken);
    //console.log(this.props.params);
    return (
      <div>
        <h1>Dashboard</h1>
        <ul>
          <li>
            {this.props.match.params.accessToken}
            {this.props.me ? `email : ${this.props.me.email}` : ''}
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth, tokens, me }) {
  return { auth, tokens, me };
}

export default connect(mapStateToProps, actions)(withRouter(Dashboard));
