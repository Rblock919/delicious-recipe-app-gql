import jwt from 'jsonwebtoken';

export const getUserFromToken = async (authHeader: string) => {
  const token = authHeader.split(' ')[1];
  // Serialized as a string from the front-end
  if (token !== 'null') {
    try {
      const payload = await jwt.verify(token, process.env.TOKEN_SECRET);
      if (payload.exp > Date.now() / 1000) {
        return {
          _id: payload.sub,
          isAdmin: payload.isAdmin,
          username: payload.username,
        };
      }
    } catch (error) {
      console.warn('Error retrieving user from token');
    }
  }
  return null;
};
