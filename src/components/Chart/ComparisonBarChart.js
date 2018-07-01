import React, { Component } from "react";
import PropTypes from "prop-types";
import { format as d3Format } from "d3-format";
import { Bar } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import ResizeAware from "react-resize-aware";
import D3MarginConvention from "./D3MarginConvention";
import DebugSVG from "./DebugSVG";

function ComparisonBarChart(props) {
  const {
    width,
    height,
    margin,
    data,
    selected,
    scales,
    accessors,
    axisFormatSpecifiers,
    showDebug
  } = props;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScaleLeft = scales.xLeft.range([innerWidth / 2, 0]);
  const xScaleRight = scales.xRight.range([innerWidth / 2, 0]);
  const yScale = scales.y
    .range([innerHeight, 0])
    .round(true)
    .paddingInner(0.2);
  const zScale = scales.z;

  const viewBox = props.viewBox ? props.viewBox : `0 0 ${width} ${height}`;

  return (
    <svg
      width={width}
      height={height}
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
            style={{ fill: zScale(selected) }}
          />
        </pattern>
      </defs>
      {showDebug && (
        <DebugSVG
          width={width}
          height={height}
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
                id={`#comparison-bar-left-${i}`}
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
                fill={zScale(selected)}
                id={`#comparison-bar-right-${i}`}
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

class ResponsiveComparisonBarChart extends Component {
  /*
    It seems that ResizeAware have `undefined` width and height the first 2
    times (i.e. before `handleResize` kicks in). Obviously we don't want to pass
    `undefined` width and height to the BarChart component. I tried to use
    conditional rendering of ResizeAware without success. I guess it is
    ResizeAware that should use conditional rendering if its width and height
    are still undefined.
  */
  state = {
    width: 1000
  };

  handleResize = props => {
    const { width, height } = props;
    // console.log("resize", width, height);
    this.setState({
      width: width
    });
  };

  render() {
    const responsiveWidth = this.state.width;
    const comparisonBarChartProps = { ...this.props, width: responsiveWidth };
    return (
      <ResizeAware
        style={{ position: "relative" }}
        onlyEvent
        onResize={this.handleResize}
      >
        <ComparisonBarChart {...comparisonBarChartProps} />
      </ResizeAware>
    );
  }
}

export { ComparisonBarChart, ResponsiveComparisonBarChart };
