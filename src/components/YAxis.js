import React, { Component } from "react";
import * as d3 from "d3";

class YAxis extends Component {
  componentDidMount() {
    this.renderYAxis();
  }
  componentDidUpdate() {
    this.renderYAxis();
  }
  renderYAxis() {
    const axis = d3
      .axisLeft()
      .tickFormat(d => `${d3.format(".2s")(d)}`)
      .scale(this.props.scale)
      .ticks(this.props.data.length);

    d3.select(this.refs.axis).call(axis);
  }
  render() {
    const { x, y } = this.props;
    return <g transform={`translate(${x}, ${y})`} ref="axis" />;
  }
}

export default YAxis;
