import React from "react";
import PropTypes from "prop-types";

const ChartFooter = props => {
  return (
    <footer style={{ backgroundColor: props.backgroundColor }}>
      <span>
        <strong>{`${props.title}: `}</strong>
      </span>
      <span>{props.summary}</span>
      {props.description && (
        <React.Fragment>
          <br />
          <span>{props.description}</span>
        </React.Fragment>
      )}
      {props.note && (
        <React.Fragment>
          <br />
          <em>{`Note: ${props.note}`}</em>
        </React.Fragment>
      )}
    </footer>
  );
};

ChartFooter.defaultProps = {
  backgroundColor: "steelblue"
};

ChartFooter.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  description: PropTypes.string,
  note: PropTypes.string,
  backgroundColor: PropTypes.string
};

export default ChartFooter;
