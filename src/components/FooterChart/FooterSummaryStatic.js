import React from "react";

function FooterSummaryStatic(props) {
  const { preTitle, title } = props;
  return (
    <span>
      <span>
        <strong>{`${preTitle}: `}</strong>
      </span>
      <span>{title}</span>
    </span>
  );
}

export default FooterSummaryStatic;
