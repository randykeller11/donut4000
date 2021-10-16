export const initSeqMapState = { 0: [false, false, false, false] };

export const seqMapReducer = (state, action) => {
  switch (action.type) {
    case "add":
      let updatedState = {
        ...state,
        [action.payload.presetId]: action.payload.map,
      };
      return updatedState;
    case "remove":
      let stateCopy = { ...state };
      delete stateCopy[action.payload.presetId];
      return stateCopy;
    case "activate":
      return { 0: [true, false, false, false] };
    case "deactivate":
      if (state[0][0]) {
        console.log(state[0][0]);
      }
      return { 0: [false, false, false, false] };
    default:
      throw new Error();
  }
};
