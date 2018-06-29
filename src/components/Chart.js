import React from "react";
import PropTypes from "prop-types";
import { max as d3Max } from "d3-array";
import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { format as d3Format } from "d3-format";
import { withParentSize } from "@vx/responsive";
import { Bar } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { GradientPinkBlue } from "@vx/gradient";
import { Text } from "@vx/text";
import D3MarginConvention from "./D3MarginConvention";

// TODO: add withDebugSVG, a HOC that wraps a SVG component
// Maybe it would be more appropriate to call it DebugSVGViewBox
function DebugSVG(props) {
  const { width, height, viewBox, margin } = props;
  const outerWidth = width;
  const outerHeight = height;
  const innerWidth = outerWidth - margin.left - margin.right;
  const innerHeight = outerHeight - margin.top - margin.bottom;
  const center = {
    x: margin.left + innerWidth / 2,
    y: margin.top + innerHeight / 2
  };
  const r = 5;
  return (
    <React.Fragment>
      <GradientPinkBlue id="debug-svg-gradient" />
      <g className={"debug-svg"}>
        <rect
          x={0}
          y={0}
          width={outerWidth}
          height={outerHeight}
          style={{ fill: "url(#debug-svg-gradient)", opacity: 0.7 }}
        />
        <Text
          x={0}
          y={0}
          dx={5}
          dy={5}
          verticalAnchor="start"
        >{`${outerWidth} x ${outerHeight}`}</Text>
      </g>
      <g className={"debug-svg-margins"}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          style={{
            fill: "none",
            stroke: "black",
            strokeWidth: 2,
            strokeDasharray: "4 1"
          }}
        />
        <Text
          x={margin.left}
          y={margin.top}
          dx={5}
          dy={5}
          verticalAnchor="start"
        >{`${innerWidth} x ${innerHeight}`}</Text>
      </g>
      <g className="svg-debug-center">
        <circle cx={center.x} cy={center.y} r={r} style={{ fill: "red" }} />
        <Text x={center.x + r} y={center.y} verticalAnchor="middle">{`(${
          center.x
        }, ${center.y})`}</Text>
      </g>
      <g className={"debug-svg-viewbox"}>
        <Text
          x={margin.left + innerWidth}
          y={margin.top + innerHeight}
          dx={-5}
          dy={-5}
          textAnchor="end"
          verticalAnchor="end"
        >{`Viewbox: ${viewBox}`}</Text>
      </g>
    </React.Fragment>
  );
}

function Chart(props) {
  const {
    parentWidth,
    parentHeight,
    margin,
    data,
    accessors,
    axisFormatSpecifiers,
    showDebug
  } = props;
  const innerWidth = parentWidth - margin.left - margin.right;
  const innerHeight = parentHeight - margin.top - margin.bottom;
  const xScale = scaleLinear()
    .domain([0, d3Max(data.map(accessors.x))])
    .range([0, innerWidth]);
  const yScale = scaleBand()
    .domain(data.map(accessors.y))
    .range([innerHeight, 0])
    .round(true)
    .paddingInner(0.2);
  const zScale = scaleOrdinal(schemeCategory10);

  const viewBox = props.viewBox
    ? props.viewBox
    : `0 0 ${parentWidth} ${parentHeight}`;

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
                onClick={d => event => {
                  alert(`clicked: ${JSON.stringify(d)}`);
                }}
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

Chart.defaultProps = {
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

Chart.propTypes = {
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

function ComparisonChart(props) {
  const {
    parentWidth,
    parentHeight,
    margin,
    data,
    accessors,
    axisFormatSpecifiers,
    showDebug
  } = props;
  const innerWidth = parentWidth - margin.left - margin.right;
  const innerHeight = parentHeight - margin.top - margin.bottom;

  // console.log('ComparisonChart.props', props);

  const maxPercentage = d3Max([
    d3Max(data.map(accessors.xLeft)),
    d3Max(data.map(accessors.xRight))
  ]);
  const xScaleLeft = scaleLinear()
    .domain([0, maxPercentage])
    .range([innerWidth / 2, 0]);
  const xScaleRight = scaleLinear()
    .domain([maxPercentage, 0])
    .range([innerWidth / 2, 0]);
  const yScale = scaleBand()
    .domain(data.map(accessors.y))
    .range([innerHeight, 0])
    .round(true)
    .paddingInner(0.2);
  const zScale = scaleOrdinal(schemeCategory10);

  const viewBox = props.viewBox
    ? props.viewBox
    : `0 0 ${parentWidth} ${parentHeight}`;

  return (
    <svg
      width={parentWidth}
      height={parentHeight}
      viewBox={viewBox}
      preserveAspectRatio="xMinYMin meet"
    >
      <defs>
        <pattern
          id="hash4_4"
          patternUnits="userSpaceOnUse"
          width={8}
          height={8}
          patternTransform="rotate(60)"
        >
          <rect
            width={4}
            height={8}
            transform="translate(0, 0)"
            style={{ fill: "red" }}
          />
        </pattern>
      </defs>
      {showDebug && (
        <DebugSVG
          width={parentWidth}
          height={parentHeight}
          viewBox={viewBox}
          margin={margin}
        />
      )}
      <D3MarginConvention top={margin.top} left={margin.left}>
        <g className={"comparison-bars-left"}>
          {data.map((d, i) => {
            return (
              <Bar
                x={xScaleLeft(accessors.xLeft(d))}
                y={yScale(accessors.y(d))}
                width={innerWidth / 2 - xScaleLeft(accessors.xLeft(d))}
                height={yScale.bandwidth()}
                data={{ x: accessors.xLeft(d), y: accessors.y(d) }}
                fill={"url(#hash4_4)"}
                fillOpacity={0.75}
                id={`#bar-${i}`}
                onClick={d => event => {
                  alert(`clicked: ${JSON.stringify(d)}`);
                }}
              />
            );
          })}
        </g>
        <g className={"comparison-bars-right"}>
          {data.map((d, i) => {
            return (
              <Bar
                x={innerWidth / 2}
                y={yScale(accessors.y(d))}
                width={xScaleRight(accessors.xRight(d))}
                height={yScale.bandwidth()}
                data={{ x: accessors.xRight(d), y: accessors.y(d) }}
                fill={zScale(accessors.z(d))}
                id={`#bar-${i}`}
                onClick={d => event => {
                  alert(`clicked: ${JSON.stringify(d)}`);
                }}
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
          scale={xScaleLeft}
          tickFormat={d => {
            return `${d3Format(axisFormatSpecifiers.xLeft)(d)}`;
          }}
          tickLabelProps={(d, i) => ({
            fontSize: 20,
            fontFamily: "Lobster",
            dx: "-0.5em"
          })}
        />
        <AxisBottom
          top={innerHeight}
          left={innerWidth / 2}
          scale={xScaleRight}
          hideZero
          tickFormat={d => {
            return `${d3Format(axisFormatSpecifiers.xRight)(d)}`;
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

/*
  withParentSize automatically passes parentWidth and parentHeight to the
  wrapped component
*/
const ResponsiveChart = withParentSize(Chart);
const ResponsiveComparisonChart = withParentSize(ComparisonChart);

export { ResponsiveChart, ResponsiveComparisonChart };
