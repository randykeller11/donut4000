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
    case "addLoop":
      const updateArray = state.filter(
        (rec) => rec.timeStamp != action.payload.timeStamp
      );
      updateArray.push({
        soundLocation: action.payload.soundLocation,
        timeStamp: action.payload.timeStamp,
      });
      return updateArray;
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
