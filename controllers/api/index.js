const router = require('express').Router();
const userRoutes = require('./userRoutes');
const ticketRoutes = require('./ticketRoutes');

router.use('/users', userRoutes);
router.use('/ticket', ticketRoutes);

module.exports = router;
