import React, { Component } from 'react';
import Notification from './Notification';
import NotificationForm from './NotificationForm';
import './NotificationContainer.css';

class NotificationContainer extends Component {
  state = {
    notifications: [
      {
        id: 'id-0',
        type: 'info',
        position: 'tl',
        message: 'Hello World',
        groupOrder: 0,
      },
    ],
  };
  visibilityHelper = { 'id-0': true };

  static defaultProps = {
    type: 'info',
    position: 'tr',
    message: 'Hello!',
  };

  onDismiss = id => {
    this.visibilityHelper[id] = false;
  };

  onSubmit = opts => {
    this.show(opts.type, opts.position, opts.message);
  };

  calculateOrder(position) {
    return this.state.notifications.filter(
      notification =>
        notification.position === position &&
        this.visibilityHelper[notification.id]
    ).length;
  }

  show(type, position, message) {
    const pos = position
      ? position
      : NotificationContainer.defaultProps.position;
    const newElement = {
      id: 'id-' + this.state.notifications.length,
      type: type ? type : NotificationContainer.defaultProps.type,
      position: pos,
      message: message ? message : NotificationContainer.defaultProps.message,
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
    return (
      <div className="container">
        <NotificationForm onSubmit={this.onSubmit} />
        {listNotifications}
      </div>
    );
  }

  render() {
    return <div>{this.renderCollection()}</div>;
  }
}

export default NotificationContainer;
