import '../style/searchStyle.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      label: 'What are you doing?'
    };
  }

  onInputChange(term) {
    if (term !== '') this.setState({ term, label: '' });
    else this.setState({ term, label: 'Whatcha up to?' });
  }

  handleClick(e) {
    e.preventDefault(); // necessary to prevent materialize from overriding event
    console.log('clicked');
    this.props.create_playlist(this.state.term);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s9 offset-s1">
            <input
              type="text"
              className="validate"
              onChange={event => this.onInputChange(event.target.value)}
            />
            <label
              className="active search-bar-label"
              data-error="wrong"
              data-success="right"
            >
              {this.state.label}
            </label>
          </div>
          <div
            onClick={e => {
              this.handleClick(e);
            }}
          >
            <div className="input-field col s2">
              <button className="btn waves-effect waves-light">Go!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ playlist }) {
  return { playlist };
}

export default connect(mapStateToProps, actions)(SearchBar);
