const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})

const Chat = sequelize.define('Chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasMany(Chat, { foreignKey: 'user1_id' });
User.hasMany(Chat, { foreignKey: 'user2_id' });
Chat.belongsTo(User, { foreignKey: 'user1_id' });
Chat.belongsTo(User, { foreignKey: 'user2_id' });

const Message = sequelize.define('Message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: {type: DataTypes.TEXT}
})

User.hasMany(Message, { foreignKey: 'sender_id' });
Chat.hasMany(Message, { foreignKey: 'chat_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });
Message.belongsTo(Chat, { foreignKey: 'chat_id' });

module.exports = {
    User,
    Chat,
    Message
}