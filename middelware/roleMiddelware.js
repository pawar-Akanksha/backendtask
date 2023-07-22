// middlewares/rolesMiddleware.js

const rolesMiddleware = (requiredRole) => {// admin
    return (req, res, next) => {
      const userRole = req.user.role;
      if (userRole === requiredRole) {
        next();
      } else {
        res.sendStatus(403);
      }
    };
  };
  
  module.exports = rolesMiddleware;
  