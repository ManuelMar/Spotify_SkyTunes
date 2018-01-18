import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderNavLeft() {
    return (
      <Link
        to={this.props.auth ? '/music' : '/'}
        className="brand-logo left green-text text-accent-3"
      >
        {this.props.auth ? `Hi ${this.props.auth.userName}` : 'SkyTunes'}
      </Link>
    );
  }

  renderNavRight() {
    if (this.props.auth === null) {
      return;
    } else if (this.props.auth === false) {
      return <a href="/auth/spotify">Login with Spotify</a>;
    } else {
      return [
        <li key="1">
          <a className="green-text text-accent-3" href="/api/logout">
            Logout
          </a>
        </li>
      ];
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper grey darken-3">
          {this.renderNavLeft()}
          <ul id="nav-mobile " className="right green-text text-accent-3">
            {this.renderNavRight()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  //console.log({ auth });
  return { auth };
}

export default connect(mapStateToProps)(Header);
