import axios from 'axios';
import { backURL } from './misc';

const instance = axios.create({
  baseURL: backURL,
  timeout: 15000,
});

instance.interceptors.request.use(req => {
  //Заменить на "содержит"
  if (!req.url.startsWith(`manihino-login`)) {
    const token = localStorage.getItem(`token`);
    req.headers.Authorization = `${token}`;
  }
   return req;
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
  getCommentary(playId) {
    return instance.get(`/commentary?playId=${playId}`);
  },
  login(login, password) {
    return instance.post(`/manihino-login`, {login, password});
  },
  currentUser() {
    return instance.get(`/manihino-user-current`);
  }
};
