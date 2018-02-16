import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../style/playerStyle.css';

class NowPlaying extends Component {
  componentDidMount() {
    if (this.props.nowPlaying) {
      this.props.fetch_track_info(this.props.nowPlaying.item.id);
    }
  }

  onNextClick(e) {
    //e.preventDefault();
    this.props
      .next_track()
      .then(() => {
        this.props.fetch_now_playing().then(() => {
          this.props.fetch_track_info(this.props.nowPlaying.item.id);
        });
      })
      .then(() => {
        return;
      });
  }

  onBackClick(e) {
    //e.preventDefault();
    this.props
      .prev_track()
      .then(() => {
        this.props.fetch_now_playing().then(() => {
          this.props.fetch_track_info(this.props.nowPlaying.item.id);
        });
      })
      .then(() => {
        return;
      });
  }

  onPlayClick(e) {
    this.props
      .pause_track()
      .then(() => {
        this.props.fetch_now_playing().then(() => {
          this.props.fetch_track_info(this.props.nowPlaying.item.id);
        });
      })
      .then(() => {
        return;
      });
  }

  renderCard() {
    if (this.props.track) {
      return (
        <div>
          <div className="row player-wrapper">
            <div className="col s6 offset-s3">
              <div className="card">
                <div className="card-image">
                  <img src={this.props.track.album.images[0].url} />
                  <span
                    className="card-title card-title-text"
                    style={{ fontWeight: 'bold', fontSize: '5 em' }}
                  >
                    {this.props.track.album.name}
                  </span>
                </div>
                <div className="card-content">
                  <ul>
                    <li>
                      <h4>
                        {this.props.track.artists[0].name}
                      </h4>
                    </li>
                    <li>
                      {this.props.track.name}
                    </li>
                  </ul>
                </div>
                <div className="card-action center">
                  <button
                    onClick={e => this.onBackClick(e)}
                    className="btn waves-effect waves-light"
                  >
                    <i className="material-icons left"> skip_previous</i>
                  </button>
                  <button
                    onClick={e => this.onPlayClick(e)}
                    className="btn waves-effect waves-light"
                  >
                    <i className="material-icons center"> play_arrow</i>
                  </button>
                  <button
                    onClick={e => this.onNextClick(e)}
                    className="btn waves-effect waves-light"
                  >
                    <i className="material-icons right"> skip_next</i>
                  </button>
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
      <div className="np-bg-img">
        {this.renderCard()}
      </div>
    );
  }
}

function mapStateToProps({ track, next, nowPlaying }) {
  return { track, next, nowPlaying };
}

export default connect(mapStateToProps, actions)(NowPlaying);
