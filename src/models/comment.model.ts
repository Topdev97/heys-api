module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define('comment', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    text: {
      type: Sequelize.STRING,
    },

    nickname: {
      type: Sequelize.STRING,
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

    // doc: {
    //   model: "doc",
    // },
  })

  return comment
}
