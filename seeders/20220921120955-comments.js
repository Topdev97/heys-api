'use strict'

module.exports = {
  async up(umzugContext) {
    /**
     * Add seed commands here.
     */
    const db = umzugContext.context
    const Comment = db.comment
    await Comment.create({
      text: 'Sample comment A',
      nickname: 'Alice',
      docId: 1,
    })
    await Comment.create({
      text: 'Reply to comment A',
      nickname: 'Alex',
      replyTo: 1,
      docId: 1,
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
  },
}
