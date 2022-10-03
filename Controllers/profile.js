const cloudinary = require('../Config/cloudinaryConfig')
const db = require('../Config/dbconfig')

exports.editprofile = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path)
  try {
    const newuser = await db.user.update(
      {
        firstName: req.body.fname,
        lastName: req.body.lname,
        about: req.body.about,
        imageurl: result.secure_url,
        cloudid: result.public_id,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )

    console.log(newuser)
    res.status(200).send(newuser)
  } catch (e) {
    console.log(e);
    next(e);
  }
}
