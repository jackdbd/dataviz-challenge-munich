import React from "react";
import FooterSummaryDynamic from "./FooterSummaryDynamic";
import FooterDescriptionDynamic from "./FooterDescriptionDynamic";

const FooterDynamic = props => {
  const { obj, data, accessor, colorScale, backgroundColor } = props;
  return (
    <footer style={{ backgroundColor: backgroundColor }}>
      <FooterSummaryDynamic
        preTitle={"Figure 2"}
        num={obj[obj.genre]}
        genre={obj.genre}
        colorScale={colorScale}
      />
      <FooterDescriptionDynamic
        intro={"These customers also like "}
        data={data}
        accessor={accessor}
        colorScale={colorScale}
      />
    </footer>
  );
};

export default FooterDynamic;
