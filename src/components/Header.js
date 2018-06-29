import React from "react";
import PropTypes from "prop-types";

const Header = props => {
  return (
    <nav style={{ backgroundColor: props.backgroundColor }}>
      <div>
        <h3 style={{ color: props.color }}>{props.text}</h3>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  text: "Header text here",
  backgroundColor: "steelblue",
  color: "black"
};

Header.propTypes = {
  text: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string
};

export default Header;
