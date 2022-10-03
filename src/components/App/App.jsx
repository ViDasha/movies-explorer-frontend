import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
 // const navigate = Redirect();
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserProfile()
      .then((currentUser) => {
        setCurrentUser(currentUser);
        setLoggedIn(true);
      })
      .catch(err => {
      // тут ловим ошибку
        console.log(err); // выведем ошибку в консоль
      });
  // позже здесь тоже нужно будет проверить токен пользователя!
  //  handleTokenCheck();
    }
  }, [loggedIn]);


  function handleOnLogin(password, email) {
    mainApi.authorize(password, email)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      setLoggedIn(true);
      handleTokenCheck();
      //Redirect("/movies");
      history.push("/movies");
    })
    .catch((err) => {
      switch (err){
        case 'Ошибка: 400': {
          console.log('Не передано одно из полей');
          break;
        }
        case 'Ошибка: 401': {
          console.log('Пользователь с email не найден');
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
        history.push("/signin");
      }
    })
    .catch((err) => {
      switch (err){
        case 'Ошибка: 400': {
          console.log('Некорректно заполнено одно из полей');
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
           // this.props.history.push("/");
          }
        })
      .catch((err) => {
        setLoggedIn(false);
        switch (err){
          case 'Ошибка: 400': {
            console.log('Токен не передан или передан не в том формате');
            break;
          }
          case 'Ошибка: 401': {
            console.log('Переданный токен некорректен');
            break;
          }
          default: {}
        }
      });
    } else {
      setLoggedIn(false);
    }
  }

  function handleOnSignOut() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    history.push('/signin');
  }

  function handleUpdateUser(inputValues) {
    const jwt = localStorage.getItem('jwt');
    mainApi.patchUserInfo(inputValues, jwt)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      setInfoTooltipOpen(true);
      setIsSuccess(true);
      //setMessage("Данные профиля успешно изменены.");
      this.closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  function closeInfoTooltip() {
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main 
              loggedIn={loggedIn}/>
          </Route>      
          <Route path="/signin">
            <Login 
              onLogin={handleOnLogin}
              loggedIn={loggedIn}/>
          </Route>
          <Route path="/signup">
            <Register 
              onRegister={handleOnRegister}
              loggedIn={loggedIn}/>
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
