import React from "react";

function FooterDescriptionDynamic(props) {
  const { intro, data, accessor, colorScale } = props;
  const firstThree = data
    .map(accessor)
    .slice(-3)
    .reverse();
  const [genre1, genre2, genre3] = [...firstThree];
  const color1 = `${colorScale(genre1)}`;
  const color2 = `${colorScale(genre2)}`;
  const color3 = `${colorScale(genre3)}`;
  return (
    <React.Fragment>
      <br />
      <span>{intro}</span>
      <span style={{ color: color1 }}>{genre1}</span>
      <span>{", "}</span>
      <span style={{ color: color2 }}>{genre2}</span>
      <span>{" and "}</span>
      <span style={{ color: color3 }}>{genre3}</span>
      <span>{"."}</span>
    </React.Fragment>
  );
}

export default FooterDescriptionDynamic;
