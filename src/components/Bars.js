import React from "react";
import PropTypes from "prop-types";
import { Bar } from "@vx/shape";

function Bars(props) {
  const {
    data,
    xScale,
    yScale,
    zScale,
    xAccessor,
    yAccessor,
    zAccessor
  } = props;
  return (
    <g className={"bars"}>
      {data.map((d, i) => {
        return (
          <Bar
            x={0}
            y={yScale(yAccessor(d))}
            width={xScale(xAccessor(d))}
            height={yScale.bandwidth()}
            data={{ x: xAccessor(d), y: yAccessor(d) }}
            fill={zScale(zAccessor(d))}
            id={`#bar-${i}`}
            onClick={d => event => {
              alert(`clicked: ${JSON.stringify(d)}`);
            }}
          />
        );
      })}
    </g>
  );
}

Bars.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired
};

export default Bars;
