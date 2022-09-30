const jwt = require('jsonwebtoken')
const db = require('../Config/dbconfig')
module.exports = (req, res, next) => {
  try {
    const token = req.headers.cookie?.split('Token=')[1]
    if (!token) {
      res.status(401).json({
        error: 'User not Signed in, Sign in First.',
      })
    }
    const decoded = jwt.verify(token, process.env.secretstring, (err, decoded) => {
      if (err) {
        //If no token is present
        res.status(400).json({
          error: 'User not Signed in, Sign in First.',
        })
      } else {
        const userEmail = decoded.email
        db.user
          .findOne({ where: { email: userEmail } })
          .then((info) => {
            if (!info) {
              //Checking if user is registered or not
              res.status(400).json({
                error: 'User not registered. Register yourself first.',
              })
            } else {
              // req.email = userEmail;                                            //Sending email and ID of user if registered
              // req.userid = info.rows[0].id;
              console.log(info)
              req.user = info
              next()
            }
          })
          .catch((err) => {
            //Handling errors
            console.log(err)
            res.status(500).json({
              error: 'Database error occured here',
            })
          })
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
