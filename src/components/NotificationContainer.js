import React, { Component } from 'react';
import Notification from './Notification';
import './NotificationContainer.css';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          id: 'id-0',
          type: 'info',
          position: 'tl',
          message: 'Hello',
          groupOrder: 0,
        },
        {
          id: 'id-1',
          type: 'alert',
          position: 'tl',
          message: 'World',
          groupOrder: 1,
        },
      ],
    };
    this.visibilityHelper = { 'id-0': true, 'id-1': true };
    this.onDismiss = this.onDismiss.bind(this);
  }

  static defaultProps = {
    type: 'info',
    position: 'tr',
    message: 'Hello!',
  };

  componentDidMount() {
    window.notification = this;
  }

  onDismiss(id) {
    this.visibilityHelper[id] = false;
  }

  calculateOrder(pos) {
    return this.state.notifications.filter(
      n => n.position === pos && this.visibilityHelper[n.id]
    ).length;
  }

  show(type, position, message) {
    var pos = position ? position : this.defaultProps.position;
    const newElement = {
      id: 'id-' + this.state.notifications.length,
      type: type ? type : this.defaultProps.type,
      position: pos,
      message: message ? message : this.defaultProps.message,
      groupOrder: this.calculateOrder(pos),
    };
    this.setState({
      notifications: [...this.state.notifications, newElement],
    });
    this.visibilityHelper[newElement.id] = true;
    return newElement;
  }

  renderCollection() {
    const { notifications } = this.state;
    const listNotifications = notifications.map(notification => (
      <Notification
        key={notification.id}
        id={notification.id}
        type={notification.type}
        position={notification.position}
        message={notification.message}
        order={notification.groupOrder}
        onDismiss={this.onDismiss}
      />
    ));
    return <div className="container">{listNotifications}</div>;
  }

  render() {
    return <div>{this.renderCollection()}</div>;
  }
}

export default NotificationContainer;
