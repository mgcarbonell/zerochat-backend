const users = [];

const addUsers = ({ id, username, node }) => {
  
  user = username
  node = node.trim().toLowerCase();

  const userInRoom = { id, user, node }
  users.push(userInRoom)
  return { userInRoom }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if(index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = (id) => users.find((user) => user.id === id);

const usersInRoom = (node) => users.filter((user) => user.node === node); 

module.exports = { addUsers, removeUser, getUser, usersInRoom }