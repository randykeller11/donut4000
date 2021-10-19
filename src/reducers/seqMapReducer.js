export const initSeqMapState = { 0: [false, false, false, false] };

export const seqMapReducer = (state, action) => {
  switch (action.type) {
    case "activateLoop":
      return state.map((soundLocation) => {
        if (soundLocation.index === action.payload.soundLocation) {
          let updateArray = [...soundLocation.map];
          updateArray[action.payload.measureIndex] = true;
          return { ...soundLocation, map: updateArray };
        } else {
          let updateArray = [...soundLocation.map];
          updateArray[action.payload.measureIndex] = false;
          return { ...soundLocation, map: updateArray };
        }
      });
    case "deactivateLoop":
      return state.map((soundLocation) => {
        if (soundLocation.index === action.payload.soundLocation) {
          let updateArray = [...soundLocation.map];
          updateArray[action.payload.measureIndex] = false;
          return { ...soundLocation, map: updateArray };
        } else return soundLocation;
      });
    default:
      throw new Error();
  }
};
