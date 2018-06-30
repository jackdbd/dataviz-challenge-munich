import React from "react";

function FooterSummaryDynamic(props) {
  const { preTitle, num, genre, colorScale } = props;
  const color = `${colorScale(genre)}`;
  return (
    <React.Fragment>
      <span>
        <strong>{`${preTitle}: `}</strong>
      </span>
      <span>{num}</span>
      <span>{" customers bought at least 1 "}</span>
      <span style={{ color: color }}>{genre}</span>
      <span>{" book."}</span>
    </React.Fragment>
  );
}

export default FooterSummaryDynamic;
