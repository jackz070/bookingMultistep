export const validateFirstName = (value: string) => {
  if (value.length === 0) {
    return false;
  } else {
    return true;
  }
};

export const validateLastName = (value: string) => {
  if (value.length === 0) {
    return false;
  } else {
    return true;
  }
};
export const validateEmail = (value: string) => {
  if (
    value.length === 0 ||
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  ) {
    return false;
  } else {
    return true;
  }
};
