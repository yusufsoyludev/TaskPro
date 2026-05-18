const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 32;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 64;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = email => EMAIL_REGEX.test(email.trim());

export const normalizeRegisterFormData = formData => ({
  name: formData.name.trim(),
  email: formData.email.trim(),
  password: formData.password,
});

export const normalizeLoginFormData = formData => ({
  email: formData.email.trim(),
  password: formData.password,
});

export const validateRegisterForm = formData => {
  const errors = {};
  const { name, email, password } = normalizeRegisterFormData(formData);

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < NAME_MIN_LENGTH) {
    errors.name = `Name must be at least ${NAME_MIN_LENGTH} characters.`;
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `Name must be ${NAME_MAX_LENGTH} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Please enter a password.';
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  } else if (password.length > PASSWORD_MAX_LENGTH) {
    errors.password = `Password must be ${PASSWORD_MAX_LENGTH} characters or fewer.`;
  }

  return errors;
};

export const validateLoginForm = formData => {
  const errors = {};
  const { email, password } = normalizeLoginFormData(formData);

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Please enter your password.';
  }

  return errors;
};
