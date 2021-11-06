const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//need to update project to ticket and value pairs
class Ticket extends Model {}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    priority: {
      type: DataTypes.STRING,
    allowNull: false,
  },
    phone: {
      type: DataTypes.STRING,
    allowNull: false,
  },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',

      },
    },
},
{
  
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ticket',
  }
);

module.exports = Ticket;
