import React from "react";

function SequencerCell({ timeStamp, displayTime }) {
  return <div>{timeStamp === displayTime ? <h4>🎸</h4> : <h4>🌊</h4>}</div>;
}

export default SequencerCell;
