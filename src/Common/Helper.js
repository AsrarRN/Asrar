export function isNotEmpty(value, fieldName = '') {
  if (
    value != undefined &&
    value != null &&
    value.toString().trim() != null &&
    value.toString().trim().length > 0 &&
    value.length > 0
  ) {
    return true;
  } else if (fieldName !== '') {
    alert('Please enter ' + fieldName);
    return false;
  }
}

export const isEmailValid = email => {
  var emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  if (emailRegex.test(email.trim())) {
    return true;
  } else {
    alert('Please enter valid email address');
    return false;
  }
};
