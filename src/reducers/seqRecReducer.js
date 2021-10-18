export const seqRecReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          soundLocation: action.payload.soundLocation,
          timeStamp: action.payload.timeStamp,
        },
      ];
    case "remove":
      return state.filter((recording) => {
        if (
          recording.soundLocation === action.payload.soundLocation &&
          recording.timeStamp === action.payload.timeStamp
        ) {
        } else {
          return recording;
        }
      });
    default:
      throw new Error();
  }
};
