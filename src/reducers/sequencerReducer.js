export const initialState = [];

export const sequencerReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          soundTarget: action.payload.soundTarget,
          timeStamp: action.payload.timeStamp,
          type: action.payload.type,
        },
      ];
    case "remove":
      return state.filter((recording) => {
        if (
          recording.soundTarget === action.payload.soundTarget &&
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
