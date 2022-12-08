import axios from "axios";


const instance = axios.create({
  baseURL: `http://localhost:4000`,
  timeout: 15000,
});

export const API = {
  getRating() {
    return instance.get(`/rating`);
  },
  getFullStory(season, gameId, ddate) {
    return instance.get(`/playsDetailed`, {params: {season, gameId, ddate}});
  },
  getCalendar(season) {
    return instance.get(`/calendar?season=${season}`);
  }
};