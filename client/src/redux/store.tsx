import { legacy_createStore as createStore, combineReducers } from 'redux';
import {composeWithDevTools } from "redux-devtools-extension"
import videosReducer, { IInitialVideoState } from './reducers/videoReducer';
import userReducer, { IInitialUserState } from './reducers/userReducer';

export type IRootSate = {
    video: IInitialVideoState,
    user: IInitialUserState
}

const rootReducer = combineReducers({
  video: videosReducer,
  user: userReducer

});

const store = createStore(rootReducer, composeWithDevTools());

export default store;