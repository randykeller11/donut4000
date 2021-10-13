import React, { useState } from "react";

function SequencerCell({ timeStamp, displayTime, dispatch, soundTarget }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onClick={() => {
        let updatedActiveStatus = !isActive;
        setIsActive(updatedActiveStatus);
        if (updatedActiveStatus) {
          dispatch({
            type: "add",
            payload: { timeStamp: timeStamp, soundTarget: soundTarget },
          });
        } else if (!updatedActiveStatus) {
          dispatch({
            type: "remove",
            payload: { timeStamp: timeStamp, soundTarget: soundTarget },
          });
        }
      }}
    >
      {timeStamp === displayTime && isActive && <h3>🎸</h3>}
      {timeStamp === displayTime && !isActive && <h3>🎤</h3>}
      {timeStamp != displayTime && isActive && <h3>🌊</h3>}
      {timeStamp != displayTime && !isActive && <h3>🎼</h3>}
    </div>
  );
}

export default SequencerCell;
