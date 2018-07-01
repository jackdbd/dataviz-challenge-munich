import React from "react";

const FooterComparison = props => {
  const { genre, colorScale, backgroundColor } = props;
  const color = `${colorScale(genre)}`;
  const longText1 =
    "On the left, percentage of customers that, given that they bough (at least) one ";
  const longText2 =
    " book, bought (at least) one book of the genre indicated on the Y axis.";
  const longText3 =
    "On the right, percentage of customers that, given that they bough (at least) one book of the genre indicated on the Y axis, bought (at least) one ";
  return (
    <footer style={{ backgroundColor: backgroundColor }}>
      <React.Fragment>
        <span>
          <strong>{"Figure 3: "}</strong>
        </span>
        <span>{"Comparative analysis of "}</span>{" "}
        <span style={{ color: color }}>{genre}</span>{" "}
        <span>{" across all genres."}</span>
        <br />
        <span>{longText1}</span>
        <span style={{ color: color }}>{genre}</span>
        <span>{longText2}</span>
        <br />
        <span>{longText3}</span>
        <span style={{ color: color }}>{genre}</span>
        <span>{" book."}</span>
      </React.Fragment>
    </footer>
  );
};

export default FooterComparison;
