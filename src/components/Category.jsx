import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Category = ({ data, handleSelect }) => {
  const { selectedCategory } = useSelector((state) => state.threads);

  return (
    <p
      className={`px-4 py-0.5 rounded-lg cursor-pointer ${
        data === selectedCategory
          ? 'bg-blue-400 text-white'
          : 'border border-black'
      }`}
      onClick={() => handleSelect(data)}
    >
      #{data}
    </p>
  );
};

Category.propTypes = {
  data: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default Category;
