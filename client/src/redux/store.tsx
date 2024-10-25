import { legacy_createStore as createStore, combineReducers } from 'redux';
import {composeWithDevTools } from "redux-devtools-extension"
import videosReducer, { IInitialVideoState } from './reducers/videoReducer';
import requestsReducer, { IInitialRequestState } from './reducers/requestReducer';

export type IRootSate = {
    video: IInitialVideoState,
    request: IInitialRequestState
}

const rootReducer = combineReducers({
  video: videosReducer,
  request: requestsReducer

});

const store = createStore(rootReducer, composeWithDevTools());

export default store;