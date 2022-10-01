import {BASE_MOVIES_URL} from '../config';

class MoviesApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
}

const moviesApi = new MoviesApi({
  baseUrl: BASE_MOVIES_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;