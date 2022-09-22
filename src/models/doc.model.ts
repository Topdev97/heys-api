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
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },

    approved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
      required: true,
    },

    docId: {
      type: Sequelize.INTEGER,
      required: true,
    },

    docType: {
      type: Sequelize.INTEGER,
      required: true,
    },

    upvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    views: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    reads: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    clicks: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
      type: Sequelize.DATE,
      allowNull: true,
    },

    content: {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: true,
    },
  })

  return doc
}
