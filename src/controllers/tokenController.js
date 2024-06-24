const { getUser } = require('../models/user');

const generateToken = (req, res) => {
  const { username } = req.body;
  console.log('Recieved request to generate token username: ${username}');
  const user = getUser(username);
  if (user) {
    const token = `${username}-${Date.now()}`;
    console.log('Generated token for ${username}: ${token}');
    res.send(`Token for ${username}: ${token}`);
  } else {
    console.log('User not found');
    res.status(404).send('User not found');
  }
};

module.exports = { generateToken };
