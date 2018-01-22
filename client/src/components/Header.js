import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../style/navStyle.css';

class Header extends Component {
  renderNavLeft() {
    return (
      <Link to={this.props.auth ? '/music' : '/'} className="brand-logo left">
        <img
          className="logo"
          src="https://www.iconsdb.com/icons/preview/guacamole-green/spotify-xxl.png"
        />
        {this.props.auth
          ? `Hi ${this.props.auth.profile.userName}`
          : 'SkyTunes'}
      </Link>
    );
  }

  renderNavRight() {
    if (this.props.auth === null) {
      return <a href="/auth/spotify">Login with Spotify</a>;
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
      <nav style={{ padding: '2 px' }}>
        <div className="nav-wrapper" style={{ backgroundColor: '#2b2927' }}>
          {this.renderNavLeft()}
          <ul
            id="nav-mobile "
            className="right green-text text-accent-3"
            style={{ fontWeight: 'bold' }}
          >
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
