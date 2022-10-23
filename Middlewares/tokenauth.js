const jwt = require('jsonwebtoken')
const db = require('../Config/dbconfig')
module.exports = (req, res, next) => {
  try {
    console.log(req.cookies)
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        error: 'User not Signed in, Sign in First.',
      })
    }
    jwt.verify(token, process.env.secretstring, (err, decoded) => {
      if (err) {
        //If no token is present
        res.status(400).json({
          error: 'User not Signed in, Sign in First.',
        })
      } else {
        console.log(decoded);
        req.userEmail=decoded.email;
        req.userid = decoded.id;
        }
    })
    next()
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: 'A Miscellaneous error occurred while signing in!',
    })
  }
}
