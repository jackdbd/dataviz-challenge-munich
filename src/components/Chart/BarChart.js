import React from "react";
import PropTypes from "prop-types";
import { format as d3Format } from "d3-format";
import { Bar } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import D3MarginConvention from "./D3MarginConvention";
import DebugSVG from "./DebugSVG";

function BarChart(props) {
  const {
    parentWidth,
    parentHeight,
    margin,
    data,
    scales,
    accessors,
    axisFormatSpecifiers,
    showDebug,
    handleMouseOver
  } = props;
  const innerWidth = parentWidth - margin.left - margin.right;
  const innerHeight = parentHeight - margin.top - margin.bottom;
  const xScale = scales.x.range([0, innerWidth]);
  const yScale = scales.y
    .range([innerHeight, 0])
    .round(true)
    .paddingInner(0.2);
  const zScale = scales.z;

  const viewBox = props.viewBox
    ? props.viewBox
    : `0 0 ${parentWidth} ${parentHeight}`;

  /*
      A chart might not have any event handlers. Also, when it has one, we need to
      convert it to a thunk. This is because in vx props that are functions need
      to be thunks.
      https://github.com/hshoff/vx/issues/50
    */
  const onMouseEnter = handleMouseOver
    ? d => event => handleMouseOver(event, d)
    : undefined;

  return (
    <svg
      width={parentWidth}
      height={parentHeight}
      viewBox={viewBox}
      preserveAspectRatio="xMinYMin meet"
    >
      {showDebug && (
        <DebugSVG
          width={parentWidth}
          height={parentHeight}
          viewBox={viewBox}
          margin={margin}
        />
      )}
      <D3MarginConvention top={margin.top} left={margin.left}>
        <g className={"bars"}>
          {data.map((d, i) => {
            return (
              <Bar
                x={0}
                y={yScale(accessors.y(d))}
                width={xScale(accessors.x(d))}
                height={yScale.bandwidth()}
                data={{ x: accessors.x(d), y: accessors.y(d) }}
                fill={zScale(accessors.z(d))}
                id={`#bar-${i}`}
                onMouseEnter={onMouseEnter}
              />
            );
          })}
        </g>
        <AxisLeft
          top={0}
          left={0}
          scale={yScale}
          stroke="#000000"
          tickStroke="#000000"
          tickLabelProps={(d, i) => ({
            textAnchor: "end",
            fontSize: 20,
            fontFamily: "Lobster",
            dx: "-0.25em",
            dy: "0.25em"
          })}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <text {...tickProps}>{formattedValue}</text>
          )}
        />
        <AxisBottom
          top={innerHeight}
          left={0}
          scale={xScale}
          label="Customers"
          labelProps={{
            fontSize: 20,
            fontFamily: "Lobster"
          }}
          tickFormat={d => {
            return `${d3Format(axisFormatSpecifiers.x)(d)}`;
          }}
          tickLabelProps={(d, i) => ({
            fontSize: 20,
            fontFamily: "Lobster",
            dx: "-0.5em"
          })}
        />
      </D3MarginConvention>
    </svg>
  );
}

BarChart.defaultProps = {
  margin: {
    top: 20,
    right: 10,
    bottom: 20,
    left: 10
  },
  axisFormatSpecifiers: {
    x: ".2s",
    y: ""
  },
  showDebug: false
};

BarChart.propTypes = {
  parentWidth: PropTypes.number.isRequired,
  parentHeight: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }),
  data: PropTypes.array.isRequired,
  accessors: PropTypes.objectOf(PropTypes.func).isRequired,
  axisFormatSpecifiers: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string
  }),
  viewBox: PropTypes.string,
  showDebug: PropTypes.bool
};

export { BarChart };
