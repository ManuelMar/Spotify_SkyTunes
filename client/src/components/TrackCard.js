import React from 'react';

const TrackCard = props => {
  return (
    <div>
      <div className="row">
        <div className="col s6 offset-s3">
          <div className="card">
            <div className="card-image">
              <img src={this.props.trackInfo.track.album.images[0].url} />
              <span
                className="card-title"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
