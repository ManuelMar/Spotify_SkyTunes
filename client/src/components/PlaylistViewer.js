import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlaylistViewer extends Component {
  renderPlaylist() {
    if (this.props.playlist) {
      console.log(this.props.playlist);
      return this.props.playlist.items.map(item => {
        return (
          <li className="collection-item" key={item.id}>
            <label>
              {item.track.name}
            </label>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>Playlist:</h4>
          </li>
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
