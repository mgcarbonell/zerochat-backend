'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {truncate: true, cascade: true, restartIdentity: true});

    const bulkUsers = await queryInterface.bulkInsert('users', [
      {
        email: 'user1@zerochat.net',
        username: 'user1',
        bio: 'user1',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@zerochat.net',
        username: 'user2',
        bio: 'user2',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@zerochat.net',
        username: 'user3',
        bio: 'user3',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user4@zerochat.net',
        username: 'user4',
        bio: 'user4',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user5@zerochat.net',
        username: 'user5',
        bio: 'user5',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user6@zerochat.net',
        username: 'user6',
        bio: 'user6',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user7@zerochat.net',
        username: 'user7',
        bio: 'user7',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user8@zerochat.net',
        username: 'user8',
        bio: 'user8',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user9@zerochat.net',
        username: 'user9',
        bio: 'user9',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user10@zerochat.net',
        username: 'user10',
        bio: 'user10',
        password: bcrypt.hashSync('strongpassword', 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {returning: true});
    console.log('bulk insert:', bulkUsers);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
