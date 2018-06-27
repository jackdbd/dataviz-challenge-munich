import React, { Component } from "react";
import PropTypes from "prop-types";
import { max as d3Max } from "d3-array"; // TODO: replace with specific d3 module for d3.max
import { AxisLeft, AxisBottom } from "@vx/axis";
import { Bar } from "@vx/shape";
import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { format as d3Format } from "d3-format";

/*
  https://stackoverflow.com/questions/48863450/a-thought-about-getderivedstatefromprops
*/
class BarChart extends Component {
  state = {
    xScale: scaleLinear()
      .domain([0, d3Max(this.props.data.map(this.props.xAccessor))])
      .range([0, this.props.width]),
    yScale: scaleBand()
      .domain(this.props.data.map(this.props.yAccessor))
      .range([this.props.height, 0])
      .round(true)
      .paddingInner(0.2),
    zScale: scaleOrdinal(schemeCategory10)
  };

  // TODO: do I need this? Do I need to update the range too?
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // console.log("prevState", prevState, "nextProps", nextProps);
  //   let { widthScale, heightScale } = prevState;
  //   widthScale.domain(d3.range(0, nextProps.data.length));
  //   heightScale.domain([0, d3.max(nextProps.data)]);
  //   prevState = { ...prevState, widthScale, heightScale };
  //   return prevState;
  // }

  // render() {
  //   // console.log(this.props);
  //   const {
  //     x,
  //     y,
  //     width,
  //     height,
  //     data,
  //     xAccessor,
  //     yAccessor,
  //     xAxisFormatSpecifier
  //   } = this.props;
  //   const translate = `translate(${x}, ${y})`;
  //   const { xScale, yScale, zScale } = this.state;
  //   return (
  //     <g transform={translate}>
  //       <g>
  //         {data.map((d, i) => {
  //           return (
  //             <rect
  //               x={0}
  //               y={yScale(yAccessor(d))}
  //               width={xScale(xAccessor(d))}
  //               height={yScale.bandwidth()}
  //               style={{ fill: zScale(yAccessor(d)) }}
  //               key={i}
  //             />
  //           );
  //         })}
  //       </g>
  //       <AxisLeft
  //         top={0}
  //         left={0}
  //         scale={yScale}
  //         stroke="#000000"
  //         tickStroke="#000000"
  //         tickLabelProps={(d, i) => ({
  //           textAnchor: "end",
  //           fontSize: 20,
  //           fontFamily: "Lobster",
  //           dx: "-0.25em",
  //           dy: "0.25em"
  //         })}
  //         tickComponent={({ formattedValue, ...tickProps }) => (
  //           <text {...tickProps}>{formattedValue}</text>
  //         )}
  //       />
  //       <AxisBottom
  //         top={height}
  //         left={0}
  //         scale={xScale}
  //         label="Customers"
  //         labelProps={{
  //           fontSize: 30,
  //           fontFamily: "Lobster"
  //         }}
  //         tickFormat={(d, i) => `${d3Format(xAxisFormatSpecifier)(d)}`}
  //         tickLabelProps={(d, i) => ({
  //           fontSize: 20,
  //           fontFamily: "Lobster",
  //           dx: "-0.5em"
  //         })}
  //       />
  //     </g>
  //   );
  // }

  render() {
    // console.log(this.props);
    const {
      x,
      y,
      width,
      height,
      data,
      xAccessor,
      yAccessor,
      xAxisFormatSpecifier
    } = this.props;
    const translate = `translate(${x}, ${y})`;
    const { xScale, yScale, zScale } = this.state;
    const thisComponent = this;
    return (
      <g transform={translate}>
        <g>
          {data.map((d, i) => {
            return (
              <Bar
                x={0}
                y={yScale(yAccessor(d))}
                width={xScale(xAccessor(d))}
                height={yScale.bandwidth()}
                fill={`url(#bWaves)`}
                fill={zScale(yAccessor(d))}
                data={{ x: xAccessor(d), y: yAccessor(d) }}
                id={`#bar-${i}`}
                data-tip={`${d.genre}: ${d.customers}`}
                data-for="global-tooltip"
                onClick={d => event => {
                  alert(`clicked: ${JSON.stringify(d)}`);
                }}
                onMouseEnter={d => event => {
                  console.log(event, d, thisComponent);
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
          top={height}
          left={0}
          scale={xScale}
          label="Customers"
          labelProps={{
            fontSize: 30,
            fontFamily: "Lobster"
          }}
          tickFormat={(d, i) => `${d3Format(xAxisFormatSpecifier)(d)}`}
          tickLabelProps={(d, i) => ({
            fontSize: 20,
            fontFamily: "Lobster",
            dx: "-0.5em"
          })}
        />
      </g>
    );
  }
}

BarChart.defaultProps = {
  x: 0,
  y: 0,
  data: [],
  xAxisFormatSpecifier: "~s"
  // width: 100,
  // height: 100
  // xAccessor: (d) => d.x,
  // yAccessor: (d) => d.y
};

BarChart.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array.isRequired,
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired,
  xAxisFormatSpecifier: PropTypes.string.isRequired
};

export default BarChart;
