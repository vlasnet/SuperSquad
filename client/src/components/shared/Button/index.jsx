import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Button = ({type, text, primary, icon, small, absolute, onClick}) => {
  const cls = [
    styles.button,
    primary ? styles.primary: '',
    small ? styles.small__icon: '',
    absolute ? styles.absolute: ''
  ].join(' ');

  const iconStyle = {
    backgroundImage: `url(${icon})`,
    backgroundSize: small ? 22 : 18,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: small ? 'center' : 10,
  };

  return (
    <button type={type} className={cls} style={iconStyle} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  primary: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  small: PropTypes.bool,
  absolute: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  text: '',
  primary: false,
  small: false,
  absolute: false,
  icon: '',
};

export default Button;
