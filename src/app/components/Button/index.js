import React from 'react';
import './index.css';

class Button extends React.Component {
  render() {
    const { children, btnStyle } = this.props;
    if (this.props.onClick) {
      return (
        <button
          className={btnStyle}
          onClick={this.props.onClick}
          id={this.props.id}
        >
          {children}
        </button>
      );
    } else {
      return <button className={btnStyle}>{children}</button>;
    }
  }
}

export default Button;
