import React from "react";
import FooterSummaryStatic from "./FooterSummaryStatic";
import FooterDescriptionStatic from "./FooterDescriptionStatic";

const FooterStatic = props => {
  const { data, accessor, colorScale, backgroundColor } = props;
  return (
    <footer style={{ backgroundColor: backgroundColor }}>
      <FooterSummaryStatic
        preTitle={"Figure 1"}
        title={"Customers who bought at least one book of these genres."}
      />
      <FooterDescriptionStatic
        intro={"The three most popular genres are: "}
        data={data}
        accessor={accessor}
        colorScale={colorScale}
        note={"Note: hover on the bars to update the visualizations below."}
      />
    </footer>
  );
};

export default FooterStatic;
