import React, { Component } from 'react';
import '../style/searchStyle.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      label: 'What are you doing?'
    };
  }

  onInputChange(term) {
    if (term != '') this.setState({ term, label: '' });
    else this.setState({ term, label: 'What are you doing?' });
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
          <div className="input-field col s2">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
