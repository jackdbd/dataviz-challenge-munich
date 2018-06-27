import React, { Component } from "react";
import styled from "styled-components";
// import { withParentSize } from "@vx/responsive";
// import ResizeAware from "react-resize-aware";
import ReactTooltip from "react-tooltip";
import { scaleThreshold, scaleOrdinal } from "@vx/scale";
import { LegendThreshold, LegendOrdinal } from "@vx/legend";
import { schemeCategory10 } from "d3-scale-chromatic";
import BarChart from "./BarChart";

// width: ${props => `${props.width}px;`};
const Container = styled.div`
  background-color: ${props => `${props.color};`};
  width: 100%;
  padding-bottom: 1em;
`;

// TODO: improve responsiveness, document how it work, remove ResizeAware?
// class Viza extends Component {
//   state = {
//     margin: { top: 20, right: 10, bottom: 20, left: 10 },
//     width: 80,
//     height: 60
//   };

//   /*
//     Compute width and height with the d3 margin convention.
//     See: https://bl.ocks.org/mbostock/3019563
//   */
//   // TODO: update scale for font-size here?
//   static getDerivedStateFromProps(nextProps, prevState) {
//     const margin = nextProps.margin || prevState.margin;
//     const width = nextProps.outerWidth - margin.left - margin.right;
//     const height = nextProps.outerHeight - margin.top - margin.bottom;
//     return {
//       margin,
//       width,
//       height
//     };
//   }

//   handleResize = ({ width, height }) => {
//     console.log("handleResize", width, height);
//   };

//   render() {
//     const { data, outerWidth, outerHeight } = this.props;
//     const margin = this.props.margin || this.state.margin;
//     const { width, height } = this.state;
//     return (
//       <div>
//         <svg
//           width={outerWidth}
//           height={outerHeight}
//           preserveAspectRatio={"xMidYMid meet"}
//           style={{ backgroundColor: "steelblue" }}
//           viewBox={`0 0 ${outerWidth} ${outerHeight}`}
//         >
//           <path
//             stroke={"red"}
//             fill={"orange"}
//             strokeCap="round"
//             strokeJoin="round"
//             d="M20.5,16.5V11A8.5,8.5,0,0,0,15,3,3,3,0,0,0,9,3,8.49,8.49,0,0,0,3.5,11v5.5a3,3,0,0,1-3,3h23A3,3,0,0,1,20.5,16.5Z"
//           />
//           <path
//             stroke={"blue"}
//             fill={"green"}
//             strokeCap="round"
//             strokeJoin="round"
//             d="M15,19.5a3,3,0,0,1-6,0"
//           />
//           <text
//             x="50"
//             y="30"
//             style={{ fontFamily: "Dokdo", fontSize: "40px", fill: "red" }}
//             transform={`scale(1, 1)`}
//           >
//             Some SVG text
//           </text>
//           <circle cx={50} cy={70} r={30} style={{ fill: "orange" }} />
//         </svg>
//       </div>
//     );
//   }
// }

// class VizB extends Component {
//   render() {
//     console.log("props", this.props);
//     return (
//       <svg>
//         <path
//           stroke={"red"}
//           fill={"orange"}
//           d="M20.5,16.5V11A8.5,8.5,0,0,0,15,3,3,3,0,0,0,9,3,8.49,8.49,0,0,0,3.5,11v5.5a3,3,0,0,1-3,3h23A3,3,0,0,1,20.5,16.5Z"
//         />
//         <path stroke={"blue"} fill={"green"} d="M15,19.5a3,3,0,0,1-6,0" />
//         <text
//           x="50"
//           y="30"
//           style={{ fontFamily: "Dokdo", fontSize: "40px", fill: "red" }}
//           transform={`scale(1, 1)`}
//         >
//           Some SVG text
//         </text>
//         <circle cx={50} cy={70} r={30} style={{ fill: "orange" }} />
//       </svg>
//     );
//   }
// }

// const ResponsiveViz = withParentSize(Viz);

const threshold = scaleThreshold({
  domain: [0.02, 0.04, 0.06, 0.08, 0.1],
  range: ["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]
});

class Viz extends Component {
  render() {
    const { data, outerWidth, outerHeight } = this.props;
    const margin = this.props.margin || this.state.margin;
    // const { width, height } = this.state;
    const colorScale = scaleOrdinal({
      domain: data.map(d => d.genre),
      range: schemeCategory10
    });

    return (
      <div>
        <svg
          width={outerWidth}
          height={outerHeight}
          preserveAspectRatio={"xMidYMid meet"}
          style={{ backgroundColor: "steelblue" }}
          viewBox={`0 0 ${outerWidth * 1.5} ${outerHeight * 1.5}`}
        >
          <defs />
          <BarChart
            x={margin.left}
            y={margin.top}
            width={outerWidth}
            height={outerHeight}
            data={data}
            xAccessor={d => d.customers}
            yAccessor={d => d.genre}
          />
        </svg>
        <ReactTooltip
          id="global-tooltip"
          place="top"
          type="dark"
          getContent={dataTip => {
            return <span>{dataTip}</span>;
          }}
        />
        <LegendThreshold
          scale={threshold}
          direction="column-reverse"
          itemDirection="row-reverse"
          labelMargin="0 20px 0 0"
          shapeMargin="1px 0 0"
        />
        <LegendOrdinal scale={colorScale} direction="column-reverse" />
      </div>
    );
  }
}

export default Viz;
