import React, { Component } from 'react';
import Select from 'react-select';
import './NotificationForm.css';

const optionsType = [
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'alert', label: 'Alert' },
];

const optionsPos = [
  { value: 'tl', label: 'Top-left' },
  { value: 'tr', label: 'Top-right' },
  { value: 'bl', label: 'Bottom-left' },
  { value: 'br', label: 'Bottom-right' },
];

class NotificationForm extends Component {
  state = {
    selectedOptionType: null,
    selectedOptionPos: null,
    message: '',
  };

  handleChangeType = selectedOptionType => {
    this.setState({ selectedOptionType });
  };

  handleChangePos = selectedOptionPos => {
    this.setState({ selectedOptionPos });
  };

  handleChangeMessage = event => {
    this.setState({ message: event.target.value });
  };

  handleSelection = () => {
    if (this.state.selectedOptionType && this.state.selectedOptionPos) {
      const opts = {
        type: this.state.selectedOptionType.value,
        position: this.state.selectedOptionPos.value,
        message: this.state.message,
      };
      this.props.onSubmit(opts);
    } else {
      alert('Please select notification type and position.');
    }
  };

  render() {
    const { selectedOptionType, selectedOptionPos } = this.state;

    return (
      <div className="form">
        <h4>Notification</h4>
        <label>Type</label>
        <Select
          value={selectedOptionType}
          onChange={this.handleChangeType}
          options={optionsType}
        />
        <label>Position</label>
        <Select
          value={selectedOptionPos}
          onChange={this.handleChangePos}
          options={optionsPos}
        />
        <label>Message</label>
        <input
          type="text"
          className="message"
          value={this.state.message}
          onChange={this.handleChangeMessage}
        />
        <button type="button" onClick={this.handleSelection}>
          Show
        </button>
      </div>
    );
  }
}

export default NotificationForm;
