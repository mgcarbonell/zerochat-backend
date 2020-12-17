const users = [];

const addUsers = ({ id, username, node }) => {
  
  username = username.trim().toLowerCase();
  node = node.trim().toLowerCase();

  const user = { id, username, node }
  users.push(user)
  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if(index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = (id) => users.find((user) => user.id === id);

const usersInNode = (node) => users.filter((user) => user.node === node); 

module.exports = { addUsers, removeUser, getUser, usersInNode }