export type IInitialErrorState = {
  error: string | null;
};

const initialState = {
  error: null,
};

const errorReducer = (
  state:IInitialErrorState = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "CHANGE_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
        return state
  }
};

export default errorReducer
