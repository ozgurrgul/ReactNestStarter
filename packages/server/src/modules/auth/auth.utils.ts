import axios from 'axios';

export const checkRecaptcha = async (token: string) => {
  const captchaResponse = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  );
  if (!captchaResponse.data.success) {
    throw new Error('RECAPTCHA_FAIL');
  }
};
