import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import dbContext from '../models/db_context'; 
const withProtect = (handler) => {
  return async (req, res) => {
    try {
      // Get token and check if it exists
      let token = String(
        req.headers["x-access-token"] || req.headers["authorization"]
      ); // Express headers are auto converted to lowercase
      if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if (err) {
            res.status(401).json({ msg: "Token is not valid" });
          } else {
            console.log(decoded);
            // Check if user exists with refresh token
            const currentUser = await dbContext.User.findById(decoded.user.id);
            if (!currentUser) {
              return res.status(401).json({
                success: false,
                message: 'The user belonging to this token no longer exist.',
              });
            }

            // Grant access to protected route
            req.user = currentUser;

            return handler(req, res);
          }
        });
      } else {
        res.status(401).json({ msg: "Token is not present" });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to get access.',
      });
    }
  };
};

export default withProtect;
