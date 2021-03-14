const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { saveToy, getToys, getToy, removeToy } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys);
router.get('/:id', log, getToy);
router.post('/', saveToy); // add
router.put('/:id', saveToy); //update
// router.post('/', requireAuth, saveToy); // add
// router.put('/:id', requireAuth, saveToy); //update
router.delete('/:id', removeToy);
// router.delete('/:id', requireAuth, removeToy);

module.exports = router