import React from "react";
import PropTypes from "prop-types";

const Header = props => {
  const { text, color, backgroundColor } = props;
  return (
    <nav style={{ backgroundColor: backgroundColor }}>
      <div>
        <h3 style={{ color: color }}>{text}</h3>
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
