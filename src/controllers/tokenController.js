const { getUser } = require('../models/user');
const { getAllUsers } = require('../models/user');

const generateToken = (req, res) => {
  const { username } = req.body;
  console.log(`Received request to generate token for username: ${username}`);
  const user = getUser(username);
  if (user) {
    const token = `${username}-${Date.now()}`;
    console.log(`Generated token for ${username}: ${token}`);
    res.send(`Token for ${username}: ${token}`);
  } else {
    console.log('User not found');
    res.status(404).send('User not found');
  }
};

const generateTokensForAllUsers = (req, res) => {
  const users = getAllUsers();
  users.forEach(user => {
    const token = `${user.username}-${Date.now()}`;
    console.log(`Generated token for ${user.username}: ${token}`);
    
  });
  res.send('Tokens generated for all users');
};

module.exports = { generateToken, generateTokensForAllUsers };
