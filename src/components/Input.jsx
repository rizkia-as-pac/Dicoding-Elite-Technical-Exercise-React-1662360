import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  innerRef = {},
  label = '',
  type = 'text',
  error = { isError: false, message: '' },
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        ref={innerRef}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        type={type}
        placeholder={label}
        required
      />
      {error.isError && <p className="text-sm text-red-400">{error.message}</p>}
    </div>
  );
};

Input.propTypes = {
  innerRef: PropTypes.object,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.object,
};

export default Input;
