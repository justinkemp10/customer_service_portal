const User = require('./User');
const Ticket = require('./Ticket');

User.hasMany(Ticket, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Ticket.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Ticket };
