import React, { Component } from "react";
import * as d3 from "d3";

class XAxis extends Component {
  constructor(props) {
    super(props);
    this.gRef = React.createRef();
  }
  componentDidMount() {
    this.renderXAxis();
  }
  componentDidUpdate() {
    this.renderXAxis();
  }
  renderXAxis() {
    const axis = d3
      .axisBottom()
      .tickFormat(d => `${d3.format(".2f")(d)}`)
      .scale(this.props.scale);

    const node = this.gRef.current;
    d3.select(node).call(axis);
  }
  render() {
    const { x, y } = this.props;
    return <g transform={`translate(${x}, ${y})`} ref={this.gRef} />;
  }
}

export default XAxis;
