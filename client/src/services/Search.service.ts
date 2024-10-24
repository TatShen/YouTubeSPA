import { youtubeInstance } from "../utils/axios";
import { ISearchFullResponse, ISearchResponse } from "./Types";



const API_KEY = "AIzaSyAbkdH8IEYZfLs4MWIGAiZJ9ZpvT-WIaDA";

class SearchApi {
  async getVideos(search: string): Promise<ISearchFullResponse | null> {
    try {
      const { data } = await youtubeInstance.get<ISearchResponse>(
        `/search?part=snippet&maxResults=25&type=video&q=${search}&key=${API_KEY}`
      );
  
      const videoIds = data.items.map(item => item.id.videoId).join(',');

      const videoDetailsResponse = await youtubeInstance.get<ISearchFullResponse>(
        `/videos?part=snippet,player,statistics&id=${videoIds}&key=${API_KEY}`
      );
  

      return {
        ...data,
        items: videoDetailsResponse.data.items,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
}

export const searchApi = new SearchApi();
