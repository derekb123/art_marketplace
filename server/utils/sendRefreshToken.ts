
export const sendRefreshToken = (res, token) => {
  res.cookie('rToken', token, {
    httpOnly: true
  });
};