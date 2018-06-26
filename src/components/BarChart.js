import React, { Component } from "react";
import * as d3 from "d3";
import { Axis, axisPropsFromTickScale, LEFT } from "react-d3-axis";
import { scaleLinear, scaleBand } from "d3-scale";
import XAxis from "./XAxis";

/*
  https://stackoverflow.com/questions/48863450/a-thought-about-getderivedstatefromprops
*/
class BarChart extends Component {
  state = {
    widthScale: scaleBand()
      .domain(d3.range(0, this.props.data.length))
      .range([0, this.props.width]),
    heightScale: scaleLinear()
      .domain([0, d3.max(this.props.data)])
      .range([this.props.height, 0])
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("prevState", prevState, "nextProps", nextProps);
    let { widthScale, heightScale } = prevState;
    widthScale.domain(d3.range(0, nextProps.data.length));
    heightScale.domain([0, d3.max(nextProps.data)]);
    prevState = { ...prevState, widthScale, heightScale };
    return prevState;
  }

  render() {
    // console.log(this.props);
    const { x, y, width, height, data } = this.props;
    const translate = `translate(${x}, ${y})`;
    const { widthScale, heightScale } = this.state;
    return (
      <g transform={translate}>
        <g>
          {data.map((d, i) => {
            return (
              <rect
                x={widthScale(i)}
                y={heightScale(d)}
                width={widthScale.bandwidth()}
                height={this.props.height - heightScale(d)}
                style={{ fill: "red" }}
                key={i}
              />
            );
          })}
        </g>
        <XAxis x={0} y={height} scale={widthScale} />
        {/* <Axis {...axisPropsFromBandedScale(widthScale)} /> */}
        <Axis
          {...axisPropsFromTickScale(heightScale, data.length)}
          style={{ orient: LEFT }}
        />
      </g>
    );
  }
}

export default BarChart;
