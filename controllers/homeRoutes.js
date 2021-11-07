const router = require('express').Router();
const { Ticket, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    
    // Get all projects and JOIN with user data
    const ticketData = await Ticket.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email']
        },
      ],
    });

    // router.get('/', async (req, res) => {
    //   try {
    //     // Get all ticket and JOIN with user data
    //     const ticketData = await Ticket.findAll({
    //     attributes: ['name','date_created','description','priority']
    //     });

    // Serialize data so the template can read it
    const tickets = ticketData.map((ticket) => ticket.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      tickets, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/ticket/:id', async (req, res) => {
  try {
    const ticketData = await Ticket.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email']
        },
      ],
    });
    // console.log(ticketData);
    const ticket = ticketData.get({ plain: true });

    res.render('ticket', {
      ...ticket,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Ticket }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
