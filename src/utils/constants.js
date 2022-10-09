export const regulars = {
    name: /^[A-Za-zА-Яа-яёЁ -]+$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/
}

export const nameErrors = {
  er400: "Ошибка: 400",
  er401: "Ошибка: 401",
  er409: "Ошибка: 409"
}
export const errorMessages = {
    requiredField: "Обязательно для заполнения",
    incorrectName: "Имя может содержать только латиницу, кириллицу, пробел или дефис",
    incorrectEmail: "Некорректный email",
    incorrectPassword: "Пароль должен быть длиннее 8 символов",
    incorrectField: "Некорректно заполнено одно из полей",
    userNotFound:"Неверный логин или пароль",
    invalidToken: "Токен не передан или передан не в том формате",
    incorrectToken: "Переданный токен некорректен",
    serverError: "Что-то пошло не так. Попробуйте еще раз!",
    connectionProblem: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    userAlreadyExists: "Такой пользователь уже существует",
    enterKeyword: "Нужно ввести ключевое слово"
  };

export const successMessages = {
  userProfile: "Данные профиля успешно изменены"
}

export const maxDurationShortMovie = 40;

export const initialCountFilms = () => {
    if (window.innerWidth < 480) {
      return 5;
    } else {
      return 7;
    }
};

export const minLengthPassword = 8;
export const maxLengthPassword = 40;