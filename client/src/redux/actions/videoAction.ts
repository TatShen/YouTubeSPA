import { ISearchFullResponse } from "../../services/Types"

export const GET_VIDEOS = 'GET_VIDEOS'

export const getVideos = (result: ISearchFullResponse) => {
  return {
    type: GET_VIDEOS,
    payload: result
  }
}