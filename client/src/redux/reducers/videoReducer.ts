import { IFullVideo, ISearchFullResponse } from "../../services/Types";

export type IInitialVideoState = {
  videos: IFullVideo[],
  amountOfVideos: number,
  request: string
}
const initialState: IInitialVideoState = {
    videos: [],
    amountOfVideos: 0,
    request:""
  };
  
  const videosReducer = (state = initialState, action: { type: string; payload: ISearchFullResponse}) => {
    switch (action.type) {
      case 'GET_VIDEOS':
        return {
            ...state,
            videos: action.payload.items,
            amountOfVideos: action.payload.pageInfo.totalResults 
          }  
      case 'ADD_REQUEST':
        return{
          ...state,
          request:action.payload
        }
      default:
        return state;
    }
  };
  
  export default videosReducer;