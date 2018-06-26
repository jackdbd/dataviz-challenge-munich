import React from "react";
import styled from "styled-components";
import BarChart from "./BarChart";

const Container = styled.div`
  background-color: ${props => `${props.color};`};
`;

const defaultMargin = { top: 20, right: 10, bottom: 20, left: 10 };

/*
  Compute width and height with the d3 margin convention.
  See: https://bl.ocks.org/mbostock/3019563
*/
const computeWidthHeight = (outerWidth, outerHeight, margin) => {
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;
  return {
    width,
    height
  };
};

const Viz = props => {
  const { outerWidth, outerHeight } = props;
  const margin = props.margin ? props.margin : defaultMargin;
  const { width, height } = computeWidthHeight(outerWidth, outerHeight, margin);
  return (
    <Container color={"#aaff00"}>
      <svg width={outerWidth} height={outerHeight}>
        <BarChart
          x={margin.left}
          y={margin.top}
          width={width}
          height={height}
          data={[40, 30, 90, 50, 15, 60, 75, 23, 100, 28, 42]}
        />
      </svg>
    </Container>
  );
};

export default Viz;
