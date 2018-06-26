import React, { Component } from "react";
import * as d3 from "d3";

class Axis extends Component {
  render() {
    const { x, y } = this.props;
    const translate = `translate(${x}, ${y})`;

    const axis = d3
      .axisLeft()
      .tickFormat(d => `${d3.format(".2s")(d)}`)
      .scale(this.props.scale)
      .ticks(this.props.data.length);

    d3.select(this.refs.anchor).call(axis);

    return <g transform={translate} ref="anchor" />;
  }
}

export default Axis;
