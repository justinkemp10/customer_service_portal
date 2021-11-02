const sequelize = require('../config/connection');
const { User, Ticket } = require('../models');

const userData = require('./userData.json');
const ticketData = require('./ticketData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const ticket of ticketData) {
    await Ticket.create({
      ...ticket,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();