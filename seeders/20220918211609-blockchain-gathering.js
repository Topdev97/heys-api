'use strict';


module.exports = {
  async up (umzugContext) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const db = umzugContext.context
    const Gathering = db.gathering
    // Save Gathering in the database
    await Gathering.create({
      name: 'Blockchain Gathering',
      slug: 'blockchain-gathering',
      description: 'The best public Google docs about crypto',
      owners: {
        "emailAddress": "me@example.com",
        "nickname": "y"
      },
      customisation: {
        "bannerColor": "green",
        "year": 2020
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
