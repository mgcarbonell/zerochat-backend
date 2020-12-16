const db = require('../models')

const update = (req, res) => {
  db.user.update(
    req.body, {
      where: {
        id: req.body.id
      }
    }).then((updatedUser) => {
      res.status(200).json({updatedUser})
    })
}

const destroy = (req, res) => {
  const currentUser = req.user.id
  db.user.destroy({
    where: {
      userId: currentUser
    }
  }).then(() => {
    res.status(200)
  })
}

module.exports = {
  update,
  destroy,
}