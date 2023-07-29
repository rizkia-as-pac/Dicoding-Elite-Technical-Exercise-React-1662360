import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, type = 'button' }) => {
  return (
    <button
      className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type={type}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
};

export default Button;
