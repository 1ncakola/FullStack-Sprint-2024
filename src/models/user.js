const users = [];

const addUser = (username, email, phone) => {
  const user = { username, email, phone };
  users.push(user);
  return user;
};

const getUser = (username) => {
  return users.find(user => user.username === username);
};

const updateUser = (username, email, phone) => {
  const user = getUser(username);
  if (user){
    if(email) user.email = email;
    if(phone) user.phone = phone;
  }
  return user;
};

const searchUser = (query) => {
  return users.filter(user =>
    user.username.includes(query) ||
    (user.email && user.email.includes(query)) ||
    (user.phone && user.phone.includes(query))
  );
};

const getAllUsers = () => {
  return users;
};

addUser('testuser', 'test@example.com', '7094531223');
addUser('pedro', 'pedro@example.com', '7094533433');

module.exports = { addUser, getUser, updateUser, searchUser, getAllUsers };
