import axios from 'axios';

export const verifyRecaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET;
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: secretKey,
        response: token
      }
    });
    return response.data.success;
  } catch (error) {
    console.error('Ошибка при верификации reCAPTCHA:', error);
    return false;
  }
};
