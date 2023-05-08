const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getChat, getChats, addChat, deleteChat, updateChat} = require('./chat.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/all/:id', getChats)
router.get('/:id', getChat)
router.post('/', addChat)
router.put('/:id',  updateChat)

// router.put('/:id',  requireAuth, updateChat)
// router.delete('/:id',  requireAuth, requireAdmin, deleteChat)

module.exports = router