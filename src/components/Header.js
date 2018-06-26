import React from "react";

const Header = props => {
  const text = props.text || "Header Title";
  return (
    <nav style={{ backgroundColor: "#00ddaa" }}>
      <div>
        <h3>{text}</h3>
      </div>
    </nav>
  );
};

export default Header;
