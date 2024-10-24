import axios, { AxiosInstance } from 'axios';



const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Content-Type': 'application/json',
  }
});

const youtubeInstance: AxiosInstance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  headers: {
    'Content-Type': 'application/json',
  }
});

export { instance, youtubeInstance };


