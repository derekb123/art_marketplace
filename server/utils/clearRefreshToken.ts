
export const clearRefreshToken = (res, token) => {
  console.log('send refresh token', token)
  res.cookie('rToken', token, {
    httpOnly: true
  });
};