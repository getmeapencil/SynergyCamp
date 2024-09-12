export const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    res.status(401).json({ message: "Unauthorized" }); // User is not authenticated, send an unauthorized response
  };
  