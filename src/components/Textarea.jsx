import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ innerRef, label }) => {
  return (
    <div className='mb-4'>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor={label}
      >
        {label}
      </label>
      <div
        ref={innerRef}
        className='shadow appearance-none border rounded w-full h-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id={label}
        contentEditable
      />
    </div>
  );
};

Textarea.propTypes = {
  innerRef: PropTypes.object.isRequired,
  label: PropTypes.string,
};

export default Textarea;
