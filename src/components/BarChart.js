import React, { Component } from "react";
import * as d3 from "d3";
import Axis from "./Axis";

/*
  https://stackoverflow.com/questions/48863450/a-thought-about-getderivedstatefromprops
*/
class BarChart extends Component {
  state = {
    widthScale: d3
      .scaleBand()
      .domain(d3.range(0, this.props.data.length))
      .range([0, this.props.width]),
    heightScale: d3
      .scaleLinear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height])
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
                y={height - heightScale(d)}
                width={widthScale.bandwidth()}
                height={heightScale(d)}
                style={{ fill: "red" }}
                key={i}
              />
            );
          })}
        </g>
        <Axis x={20} y={0} data={data} scale={heightScale} />
      </g>
    );
  }
}

export default BarChart;
