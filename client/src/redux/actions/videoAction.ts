import { ISearchFullResponse } from "../../services/Types"

export const GET_VIDEOS = 'GET_VIDEOS'
export const ADD_REQUEST = 'ADD_REQUEST'

export const getVideos = (result: ISearchFullResponse) => {
  return {
    type: GET_VIDEOS,
    payload: result
  }
}

export const addRequest = (request: string) => {
  return {
    type: ADD_REQUEST,
    payload: request
  }
}