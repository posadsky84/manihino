import axios from "axios";
import { backURL } from "./misc";



const instance = axios.create({
  baseURL: backURL,
  timeout: 15000,
});

export const API = {
  getRating() {
    return instance.get(`/rating`);
  },
  getPlaysDetailed(season, gameId, ddate) {
    return instance.get(`/playsDetailed`, {params: {season, gameId, ddate}});
  },
  getCalendar(season) {
    return instance.get(`/calendar?season=${season}`);
  },
  getPlayers() {
    return instance.get(`/players`);
  },
  addPlay(data) {
    return instance.post(`/addPlay`, data);
  },
};