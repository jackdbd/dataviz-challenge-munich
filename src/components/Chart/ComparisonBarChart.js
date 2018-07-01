import React from "react";
import PropTypes from "prop-types";
import { format as d3Format } from "d3-format";
import { Bar } from "@vx/shape";
import { AxisLeft, AxisBottom } from "@vx/axis";
import D3MarginConvention from "./D3MarginConvention";
import DebugSVG from "./DebugSVG";

function ComparisonBarChart(props) {
  const {
    parentWidth,
    parentHeight,
    margin,
    data,
    selected,
    scales,
    accessors,
    axisFormatSpecifiers,
    showDebug
  } = props;
  const innerWidth = parentWidth - margin.left - margin.right;
  const innerHeight = parentHeight - margin.top - margin.bottom;

  const xScaleLeft = scales.xLeft.range([innerWidth / 2, 0]);
  const xScaleRight = scales.xRight.range([innerWidth / 2, 0]);
  const yScale = scales.y
    .range([innerHeight, 0])
    .round(true)
    .paddingInner(0.2);
  const zScale = scales.z;

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
            style={{ fill: zScale(selected) }}
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

export { ComparisonBarChart };
