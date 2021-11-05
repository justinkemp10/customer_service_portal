const router = require('express').Router();
const { Ticket } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  
  console.log(req.params);
  try {
    const newTicket = await Ticket.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTicket);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const ticketData = await Ticket.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!ticketData) {
      res.status(404).json({ message: 'No ticket found with this id!' });
      return;
    }

    res.status(200).json(ticketData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
