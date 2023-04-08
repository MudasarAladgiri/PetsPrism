import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text }) => {
  return (
    <div className="rating flex items-center">
      <span className="text-yellow-400 ">
        {value >= 1 ? (
          <i className="fas fa-star"></i>
        ) : value >= 0.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}
      </span>
      <span className="text-yellow-400">
        {value >= 2 ? (
          <i className="fas fa-star"></i>
        ) : value >= 1.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}
      </span>
      <span className="text-yellow-400">
        {value >= 3 ? (
          <i className="fas fa-star"></i>
        ) : value >= 2.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}
      </span>
      <span className="text-yellow-400">
        {value >= 4 ? (
          <i className="fas fa-star"></i>
        ) : value >= 3.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}
      </span>
      <span className="text-yellow-400">
        {value >= 5 ? (
          <i className="fas fa-star"></i>
        ) : value >= 4.5 ? (
          <i className="fas fa-star-half-alt"></i>
        ) : (
          <i className="far fa-star"></i>
        )}
      </span>
      <span className="ml-2">{text && text}</span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Rating;
