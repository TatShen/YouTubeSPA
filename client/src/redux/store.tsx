import { legacy_createStore as createStore, combineReducers } from 'redux';
import {composeWithDevTools } from "redux-devtools-extension"
import videosReducer, { IInitialVideoState } from './reducers/videoReducer';
import userReducer, { IInitialUserState } from './reducers/userReducer';
import errorReducer, { IInitialErrorState } from './reducers/errorReducer';

export type IRootSate = {
    video: IInitialVideoState,
    user: IInitialUserState,
    error: IInitialErrorState
}

const rootReducer = combineReducers({
  video: videosReducer,
  user: userReducer,
  error: errorReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;