import React, { Component } from "react";
import * as d3 from "d3"; // TODO: replace with specific d3 module for d3.max
import { Axis, axisPropsFromBandedScale, LEFT } from "react-d3-axis";
import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import XAxis from "./XAxis";

/*
  https://stackoverflow.com/questions/48863450/a-thought-about-getderivedstatefromprops
*/
class BarChart extends Component {
  state = {
    xScale: scaleLinear()
      .domain([0, d3.max(this.props.data.map(d => d[this.props.xAccessor]))])
      .range([0, this.props.width]),
    yScale: scaleBand()
      .domain(this.props.data.map(d => d[this.props.yAccessor]))
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

  render() {
    // console.log(this.props);
    const { x, y, width, height, data, xAccessor, yAccessor } = this.props;
    const translate = `translate(${x}, ${y})`;
    const { xScale, yScale, zScale } = this.state;
    return (
      <g transform={translate}>
        <g>
          {data.map((d, i) => {
            return (
              <rect
                x={0}
                y={yScale(d[yAccessor])}
                width={xScale(d[xAccessor])}
                height={yScale.bandwidth()}
                style={{ fill: zScale(d[yAccessor]) }}
                key={i}
              />
            );
          })}
        </g>
        <Axis {...axisPropsFromBandedScale(yScale)} style={{ orient: LEFT }} />
        <XAxis x={0} y={height} scale={xScale} />
      </g>
    );
  }
}

export default BarChart;
