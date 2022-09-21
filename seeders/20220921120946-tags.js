'use strict'

module.exports = {
  async up(umzugContext) {
    /**
     * Add seed commands here.
     */
    const db = umzugContext.context
    const Tag = db.tag
    await Tag.create({
      title: 'tag-A',
      count: 2,
      gatheringId: 1
    })
    await Tag.create({
      title: 'tag-B',
      count: 2,
      gatheringId: 1
    })
    await Tag.create({
      title: 'tag-C',
      count: 1,
      gatheringId: 1
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
  },
}
