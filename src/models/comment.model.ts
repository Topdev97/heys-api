module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define('comment', {
    text: {
      type: Sequelize.STRING,
      required: true,
    },

    nickname: {
      type: Sequelize.STRING,
      defaultsTo: 'Annonymous',
      maxLength: 100,
    },

    emailAddress: {
      type: Sequelize.STRING,
      maxLength: 150,
      allowNull: true,
    },

    upvotes: {
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    replyTo: {
      type: Sequelize.INTEGER,
      defaultsTo: -1,
    },
  })

  return comment
}
