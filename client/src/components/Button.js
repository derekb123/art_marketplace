import React from 'react';
import classnames from 'classnames';

const Button = (props) => {
  const buttonClass = classnames("button", {
    "button--buy": props.buy,
    "button--login": props.login,
    "button--offer": props.offer,
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}>
      {props.name}
    </button>
  )
}

export default Button;