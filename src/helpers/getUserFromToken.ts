import jwt from 'jsonwebtoken';

export const getUserFromToken = async (authHeader: string) => {
  const token = authHeader.split(' ')[1];
  if (token) {
    try {
      const payload = await jwt.verify(token, process.env.TOKEN_SECRET);
      if (payload.exp > Date.now() / 1000) {
        return { id: payload.sub, isAdmin: payload.isAdmin };
      }
    } catch (error) {
      console.log('error verifying token: ', error);
    }
  }
  return null;
};
