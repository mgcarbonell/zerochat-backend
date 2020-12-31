const router = require('express').Router()
const ctrl = require('../controllers')

// PATH = /api/v1/users
router.put('/update', ctrl.users.update)
router.delete('/delete', ctrl.users.destroy)

module.exports = router
