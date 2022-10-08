import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {MovieContext} from '../../contexts/MovieContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { errorMessages, successMessages, nameErrors } from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [moviesState, setMoviesState] = useState({
    list: [],
    filteredMovies: [],
    moviesCheckbox: false,
    moviesSearchText: "",
    savedMovies: [],
    filteredSavedMovies: [],
    savedMoviesCheckbox: false,
    savedMoviesSearchText: "",
    notFoundMovies: false,
    notFoundSavedMovies: false,
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [successRequest, setSuccessRequest] = useState(false);


  useEffect (() => {
    handleTokenCheck();
  }, []);

  function handleOnLogin(password, email) {
    mainApi.authorize(password, email)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      setLoggedIn(true);
      handleTokenCheck();
      history.push("/movies");
    })
    .catch((err) => {
      switch (err){
        case nameErrors.er400: {
          console.log(errorMessages.incorrectField);
          setInfoTooltipOpen(true);
          setIsSuccess(false);
          setMessage(errorMessages.incorrectField);
          break;
        }
        case nameErrors.er401: {
          console.log(errorMessages.userNotFound);
          setInfoTooltipOpen(true);
          setIsSuccess(false);
          setMessage(errorMessages.userNotFound);
          break;
        }
        default: {}
      }
      setInfoTooltipOpen(true);
      setIsSuccess(false);
    });
  } 

  function handleOnRegister(name, password, email) {
    mainApi.register(name, password, email)
    .then((res) => {
      if (res) {
        handleOnLogin(password, email);
      }
    })
    .catch((err) => {
      switch (err){
        case nameErrors.er400: {
          console.log(errorMessages.incorrectField);
          setInfoTooltipOpen(true);
          setIsSuccess(false);
          setMessage(errorMessages.incorrectField);
          break;
        }
        case nameErrors.er409: {
          console.log(errorMessages.userAlreadyExists);
          setInfoTooltipOpen(true);
          setIsSuccess(false);
          setMessage(errorMessages.userAlreadyExists);
          break;
        }
        default: {}
      }
      setInfoTooltipOpen(true);
      setIsSuccess(false);
    });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    // здесь будем проверять токен
    if (jwt){
      // проверим токен
      mainApi.getUserProfile(jwt)
        .then((data) => {
          if (data){
          // здесь можем получить данные пользователя!
          setCurrentUser(data);
          // авторизуем пользователя
          setLoggedIn(true);
          }
        })
      .catch((err) => {
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
        switch (err){
          case nameErrors.er400: {
            console.log(errorMessages.invalidToken);
            break;
          }
          case nameErrors.er401: {
            console.log(errorMessages.incorrectToken);
            break;
          }
          default: {}
        }
      })
      .finally(() => setSuccessRequest(true));
    } else {
      setSuccessRequest(true);
      setCurrentUser({});
      setLoggedIn(false);
      localStorage.clear();
    }
  }

  function handleOnSignOut() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  function handleUpdateUser(inputValues) {
    const jwt = localStorage.getItem('jwt');
    mainApi.patchUserInfo(inputValues, jwt)
    .then((resultValue) => {
      setCurrentUser(resultValue);
      //setCurrentUser(userInfo);
      setInfoTooltipOpen(true);
      setIsSuccess(true);
      setMessage(successMessages.userProfile);
    })
    .catch((err) => {
      setInfoTooltipOpen(true);
      setIsSuccess(false);
      setMessage(errorMessages.serverError);
      console.log(err); // выведем ошибку в консоль
    })
  }

  function closeInfoTooltip() {
    setInfoTooltipOpen(false);
  }

  function handleSaveMovie(movie) {
    const jwt = localStorage.getItem('jwt');
    mainApi.saveMovie(movie, jwt)
    .then((newMovie) => {
      setMoviesState({...moviesState, savedMovies: [...moviesState.savedMovies, newMovie]});
    })
    .catch((err) => {
      setInfoTooltipOpen(true);
      setIsSuccess(false);
      setMessage(errorMessages.serverError);
      console.log(err); // выведем ошибку в консоль
    })
  }

function handleDeleteMovie(movie) {
    const savedMovie = moviesState.savedMovies.find((item) => item.movieId === movie.id || item.movieId === movie.movieId);
    const jwt = localStorage.getItem('jwt');
    mainApi.deleteMovie(savedMovie._id, jwt)
      .then(() => {
        const newMoviesList =  moviesState.savedMovies.filter((m) => !(movie.id === m.movieId || movie.movieId === m.movieId));
          setMoviesState({ ...moviesState, savedMovies: newMoviesList });
        })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setIsSuccess(false);
        setMessage(errorMessages.serverError);
        console.log(err); // выведем ошибку в консоль
      })
}

  return (
    successRequest && (<CurrentUserContext.Provider value={currentUser}>
      <MovieContext.Provider value={{ moviesState, setMoviesState }}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main 
              loggedIn={loggedIn}/>
          </Route>      
          {!loggedIn && <Route path="/signin">
            <Login 
              onLogin={handleOnLogin}
              loggedIn={loggedIn}
              setInfoTooltipOpen={setInfoTooltipOpen}
              setIsSuccess={setIsSuccess}
              setMessage={setMessage}
            />
          </Route>}
          {!loggedIn && <Route path="/signup">
            <Register 
              onRegister={handleOnRegister}
              loggedIn={loggedIn}
              setInfoTooltipOpen={setInfoTooltipOpen}
              setIsSuccess={setIsSuccess}
              setMessage={setMessage}
            />
          </Route>}
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            onClickSave={handleSaveMovie}
            onClickDelete={handleDeleteMovie}
            setInfoTooltipOpen={setInfoTooltipOpen}
            setIsSuccess={setIsSuccess}
            setMessage={setMessage}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            onClickDelete={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser}
            onSignOut={handleOnSignOut}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip 
          isOpen={infoTooltipOpen} 
          onClose={closeInfoTooltip} 
          isSuccess={isSuccess}
          message={message}/>
      </div>
      </MovieContext.Provider>
    </CurrentUserContext.Provider>
  ));
}

export default App;
