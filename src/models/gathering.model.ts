module.exports = (sequelize, Sequelize) => {
  const gathering = sequelize.define("gathering", {
    name: {
      type: Sequelize.STRING,
      required: true,
      maxLength: 500,
    },

    slug: {
      type: Sequelize.STRING,
      maxLength: 500,
    },

    description: {
      type: Sequelize.STRING,
      required: true,
      maxLength: 1000,
    },

    upvotes: {
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    owners: {
      type: Sequelize.JSON,
      description: 'e.g {"emailAddress": "x", "nickname": "y"}',
    },

    customisation: {
      type: Sequelize.JSON,
      description: 'e.g. {bannerColor: "red", year: 2020}',
    },
  });

  return gathering;
};
