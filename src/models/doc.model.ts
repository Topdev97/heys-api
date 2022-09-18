module.exports = (sequelize, Sequelize) => {
  const doc = sequelize.define('doc', {
    title: {
      type: Sequelize.STRING,
      required: true,
      maxLength: 500,
    },

    description: {
      type: Sequelize.STRING,
      required: true,
      maxLength: 1000,
    },

    tags: {
      type: Sequelize.STRING,
      maxLength: 500,
      defaultsTo: '',
    },

    approved: {
      type: Sequelize.BOOLEAN,
      defaultsTo: false,
    },

    slug: {
      type: Sequelize.STRING,
      maxLength: 500,
    },

    url: {
      type: Sequelize.STRING,
      required: true,
      maxLength: 500,
    },

    docUid: {
      type: Sequelize.STRING,
      defaultsTo: 0,
    },

    docId: {
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    upvotes: {
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    views: {
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    reads: {
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    clicks: {
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    permissions: {
      type: Sequelize.JSON,
    },

    meta: {
      type: Sequelize.JSON,
    },

    payments: {
      type: Sequelize.JSON,
    },

    contentDate: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    content: {
      type: Sequelize.STRING,
      defaultsTo: '',
      allowNull: true,
    },
  })

  return doc
}
