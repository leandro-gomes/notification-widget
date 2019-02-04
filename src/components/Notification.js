import React, { Component } from 'react';
import './Notification.css';
import SETTINGS from './../constants.js';
import PropTypes from 'prop-types';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true, autoDismissTime: SETTINGS.AUTO_DISMISS };
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.setState({ visible: false }),
      this.state.autoDismissTime
    );
  }

  componentDidUpdate() {
    if (!this.state.visible) {
      clearInterval(this.timerID);
      this.props.onDismiss(this.props.id);
    }
  }

  calculateYPos(position, order) {
    var YPos;
    if (position === 'tl' || position === 'tr') {
      YPos = {
        top: 10 + 80 * order + 'px',
      };
    } else {
      YPos = {
        bottom: 10 + 80 * order + 'px',
      };
    }
    return YPos;
  }

  dismiss() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const { type, position, message, order } = this.props;
    const verticalPos = this.calculateYPos(position, order);
    if (visible === false) return null;
    return (
      <div className={`box ${position} ${type}`} style={verticalPos}>
        <div className="message">{message}</div>
        <span className="dismiss" onClick={this.dismiss}>
          x
        </span>
      </div>
    );
  }
}

Notification.propTypes = {
  type: PropTypes.oneOf(SETTINGS.TYPE).isRequired,
  position: PropTypes.oneOf(SETTINGS.POSITION).isRequired,
  message: PropTypes.string.isRequired,
  order: PropTypes.number,
  onDismiss: PropTypes.func,
  id: PropTypes.string,
};

export default Notification;
