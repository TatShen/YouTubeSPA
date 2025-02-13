import { IUser } from "../actions/userAction";

export type IInitialUserState = {
  user: IUser | null
};
const initialState = {
  user: null
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: IUser }
) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
