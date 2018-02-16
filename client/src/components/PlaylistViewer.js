import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlaylistViewer extends Component {
  renderPlaylist() {
    if (this.props.playlist) {
      return this.props.playlist.pl.items.map(item => {
        return (
          <li className="collection-item" key={item.track.id}>
            <span>
              {item.track.name}
            </span>
            <span style={{ float: 'right' }}>
              {item.track.artists[0].name}
            </span>
          </li>
        );
      });
    }
  }

  renderTitle() {
    if (this.props.playlist) {
      return (
        <li className="collection-header">
          <h4>
            <a href={this.props.playlist.pl.href}>
              Skytunes: {this.props.playlist.name}
            </a>
          </h4>
        </li>
      );
    }
  }

  render() {
    console.log('a playlist');
    console.log(this.props.playlist);
    return (
      <div>
        <ul className="collection with-header">
          {this.renderTitle()}
          {this.renderPlaylist()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ playlist }) {
  return { playlist };
}

export default connect(mapStateToProps)(PlaylistViewer);
