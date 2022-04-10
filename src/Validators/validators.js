export const dateValidator = (input) => {
  const valdators = [new Date(input) > new Date()];

  for (const validator of valdators) {
    if (!validator) return false;
  }
  return true;
};

export const namesValidator = (input) => {
  const valdators = [input !== "", input.length < 50];

  for (const validator of valdators) {
    if (!validator) return false;
  }
  return true;
};
