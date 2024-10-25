import { IFullVideo, ISearchFullResponse } from "../../services/Types";

export type IInitialVideoState = {
  videos: IFullVideo[],
  amountOfVideos: number
}
const initialState: IInitialVideoState = {
    videos: [],
    amountOfVideos: 0
  };
  
  const videosReducer = (state = initialState, action: { type: string; payload: ISearchFullResponse}) => {
    switch (action.type) {
      case 'GET_VIDEOS':
        return {
            ...state,
            videos: action.payload.items,
            amountOfVideos: action.payload.pageInfo.totalResults 
          }  
     
      default:
        return state;
    }
  };
  
  export default videosReducer;