const router = require('express').Router()
const ctrl = require('../controllers')

// PATH = /api/v1/user
router.put('/update', ctrl.users.update)
router.delete('/destroy', ctrl.users.destroy)

module.exports = router
