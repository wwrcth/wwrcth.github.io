import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoFilter extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    onShow: PropTypes.func.isRequired,
  };

  renderFilterLink() {
    const { filter: selectedFilter, onShow } = this.props;
    const onChange_ = () => { selectedFilter === 'all' ? onShow('completed') : onShow('all'); };
    return (
      <input className="toggle"
                 type="checkbox"
                 onChange={() => onChange_()} />  
    )
  };

  render() {
    return (
      <div>
        {this.renderFilterLink()}
        <label>Show done</label>
      </div>
    )
  }
};