import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../style/playerStyle.css';

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
                  <button className="btn waves-effect waves-light">
                    <i className="material-icons left"> skip_previous</i>
                  </button>
                  <button className="btn waves-effect waves-light">
                    <i className="material-icons center"> play_arrow</i>
                  </button>
                  <button className="btn waves-effect waves-light">
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

function mapStateToProps({ track }) {
  return { track };
}

export default connect(mapStateToProps, actions)(NowPlaying);
