const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
       return res.status(401).json({message: "Not authorized"})
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY)  //check if token is valid
    req.user = decoded
    next() //calling next middleware
  } catch (e) {
    res.status(401).json({ message: "User is not authorized" });
  }
};
