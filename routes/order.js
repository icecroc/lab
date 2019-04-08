const express = require('express')
const passport = require('passport')
const controller = require('../controllers/order')
const router = express.Router()


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/closed', passport.authenticate('jwt', {session: false}), controller.getClosed)
router.get('/archived', passport.authenticate('jwt', {session: false}), controller.getArchived)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.post('/:id', passport.authenticate('jwt', {session: false}),controller.update)


module.exports = router