import React from 'react';
import './index.css';

class Button extends React.Component {
  render() {
    const { children, btnStyle, onClick } = this.props;

    if (children === "Remove" || children === "Favorite") {
      return (
        <button
          className={children === "Remove" ? 'Card-btn Ghost-btn' : 'Card-btn' }
          onClick={onClick}
          id={this.props.id}
        >
          {children}
        </button>
      );
    } else {
      return <button className={btnStyle} onClick={onClick}>{children}</button>;
    }
  }
}

export default Button;
