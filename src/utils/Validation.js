import { regulars, errorMessages, minLengthPassword, maxLengthPassword } from "../utils/constants";

function checkValidition(name, value) {
  let isValid = true;
  let errorMessage = '';
  let regular = '';

  if (!value) {
    errorMessage = errorMessages.requiredField;
    isValid = false;
    return { isValid, errorMessage};
  }

  switch (name) {
    case "name": 
        regular = regulars.name;
        if (!regular.test(String(value).toLowerCase())) {
          errorMessage = errorMessages.incorrectName;
          isValid = false;
        }
        break;
    case "email":
        regular = regulars.email;
        if (!regular.test(String(value).toLowerCase())) {
          errorMessage = errorMessages.incorrectEmail;
          isValid = false;
        }
        break;
    default:
      if (value.length < minLengthPassword || value.length > maxLengthPassword) {
        errorMessage = errorMessages.incorrectPassword;
        isValid = false;
        break;
      }
  }

  return { isValid, errorMessage};
}

export default checkValidition;