const db = require('../models');

const update = (req, res) => {
  db.user.update({
      username: req.body.username,
      email: req.body.email,
      bio: req.body.bio
  }, {
      where: {
          id: req.params.id
      }
  }).then((updatedUser) => {
      res.json({user: updatedUser})
  }).catch(error => console.log("Error in updating user"))
};

const destroy = (req, res) => {
  const currentUser = req.user.id
  console.log(currentUser)
  db.user.destroy({
    where: {
      id: currentUser
    }
  }).then(() => {
    res.status(200)
  })
};

module.exports = {
  update,
  destroy,
};