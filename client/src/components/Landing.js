import React from 'react';
import '../style/landingStyle.css';

const Landing = () => {
  return (
    <div className="row landing-box">
      <div className="col s12 m12">
        <div className="card lighten-2 jumbotron">
          <div className="card-image">
            <img
              className="bg-image"
              src="https://images4.alphacoders.com/278/278448.jpg"
            />
            <div className="landing-text">
              Welcome to SkyTunes
              <h4>An activity based music player!</h4>
              <h4>Get started by logging in with Spotify above</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
