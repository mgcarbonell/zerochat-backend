const users = [];

const addUsers = ({ id, user, node }) => {
  user = user.trim().toLowerCase();
  node = node.trim().toLowerCase();

  const noRoom = users.find((user) => user.room != room )
  if(noRoom) {
    return {error: 'No such room!'}
  }

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