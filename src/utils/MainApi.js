import {BASE_MAIN_URL} from "../config";

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  
  _renderResult(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(name, password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, password, email})
    })
    .then(this._renderResult);
  };
  
  authorize(password, email) {
      return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({password, email})
      })
      .then(this._renderResult);
    };
  
  getUserProfile(token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._renderResult);
  }

  patchUserInfo(info, token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: info.name,
        email: info.email
      })
    })
    .then (this._renderResult);
  }

  getMovies(token) {
    return fetch(this._baseUrl + '/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._renderResult);
  }

  saveMovie(movie, token) {
    return fetch(this._baseUrl + '/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: movie.country || 'Unknown',
        director: movie.director || 'Unknown',
        duration: movie.duration || 'Unknown',
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink || 'https://youtube.com',
        nameRU: movie.nameRU,
        nameEN: movie.nameEN || 'Unknown',
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id
      })
    })
    .then(this._renderResult);
  }

  deleteMovie(movieId, token) {
    return fetch(this._baseUrl + '/movies/' + movieId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then (this._renderResult);
  }
}
  
const mainApi = new MainApi({
  baseUrl: BASE_MAIN_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
  
  export default mainApi;