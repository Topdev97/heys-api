module.exports = (sequelize, Sequelize) => {
  const tag = sequelize.define('tag', {
    title: {
      type: Sequelize.STRING,
      required: true,
      maxLength: 100,
    },

    count: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  })

  return tag
}
