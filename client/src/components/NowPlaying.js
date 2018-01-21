import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class NowPlaying extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.song) {
      this.props.fetch_track_info(this.props.song.item.id);
    }
  }

  renderCard() {
    if (this.props.track) {
      return (
        <div>
          <div className="row">
            <div className="col s6 offset-s3">
              <div className="card">
                <div className="card-image">
                  <img src={this.props.track.album.images[0].url} />
                  <span className="card-title">
                    {this.props.track.album.name}
                  </span>
                </div>
                <div className="card-content">
                  <p>
                    {this.props.track.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log('now playing props:');
    console.log(this.props);
    return (
      <div>
        {this.renderCard()}
      </div>
    );
  }
}

function mapStateToProps({ track }) {
  return { track };
}

export default connect(mapStateToProps, actions)(NowPlaying);

/*
<div>
  <div className="card medium ">
    <div className="card-image">
      <img
        className="albumCover"
        style={{ height: '250' }}
        src={this.props.track.album.images[0].url}
      />
      <span className="card-title">
        {this.props.track.album.name}
      </span>
    </div>
    <div className="card-content">
      <h3>
        {this.props.track.name}
      </h3>
    </div>
    <div className="card-action">
      <a href="#">This is a link</a>
    </div>
  </div>
</div>
*/
