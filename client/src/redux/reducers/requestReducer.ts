import { IRequest } from "../actions/requestAction";

export type IInitialRequestState = {
  request: IRequest[]
}
const initialState = {
  requests: [],
};

const requestsReducer = (
  state= initialState,
  action: { type: string; payload: IRequest }
) => {
  switch (action.type) {
    case "ADD_REQUEST":
      return {
        ...state,
        requests: [...state.requests, { ...action.payload }],
      };

    default:
      return state;
  }
};


export default requestsReducer