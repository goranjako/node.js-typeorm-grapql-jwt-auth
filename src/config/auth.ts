const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config();

const auth= (req: { req: { headers: { authorization: any; }; }; }) => {
  // context = { ...headers }
  const authHeader = req.req.headers.authorization;
  if (authHeader) {
    // convention for tokens: "Bearer ..."
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
// error handling
  throw new Error('Authorization header must be provided');
};
export default auth;