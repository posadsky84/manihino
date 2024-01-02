import axios from 'axios';
import { backURL } from './misc';

const instance = axios.create({
  baseURL: backURL,
  timeout: 15000,
});

export const API = {
  getRating(season) {
    return instance.get(`/rating?season=${season}`);
  },
  getPlaysDetailed(season, gameId, ddate) {
    return instance.get(`/playsDetailed`, { params: { season, gameId, ddate } });
  },
  getCalendar(season) {
    return instance.get(`/calendar?season=${season}`);
  },
  getPlayers() {
    return instance.get(`/players`);
  },
  getGames() {
    return instance.get(`/games`);
  },
  addPlay(data) {
    return instance.post(`/addPlay`, data);
  },
  getAllSeasons() {
    return instance.get(`/allSeasons`);
  },
  login(login, password) {
    return instance.post(`/manihino-login`, {login, password});
  }
};
