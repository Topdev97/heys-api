module.exports = (sequelize, Sequelize) => {
  const document = sequelize.define("document", {
    title: {
      type: Sequelize.STRING,
      required: true,
      maxLength: 500,
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
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    description: {
      type: Sequelize.STRING,
      required: true,
      maxLength: 1000,
    },

    tags: {
      type: Sequelize.STRING,
      maxLength: 500,
      defaultsTo: "",
    },

    upvotes: {
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    views: {
      type: Sequelize.INTEGER,
      defaultsTo: 0,
    },

    readeds: {
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

    // alter table document add column payments json after meta
    payments: {
      type: Sequelize.JSON,
    },

    // comments: {
    //   collection: "comment",
    //   via: "document",
    // },

    allowNotifications: {
      type: Sequelize.BOOLEAN,
      defaultsTo: true,
    },

    hallOfFame: {
      type: Sequelize.JSON,
      description: 'e.g. {place: 3, month: "May", monthIdx: 4, year: 2020}',
    },

    contentDate: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    content: {
      type: Sequelize.STRING,
      defaultsTo: "",
      allowNull: true,
    },

    spacesArr: {
      type: Sequelize.STRING,
      defaultsTo: "[]",
      description: 'e.g. ["1", "3"]',
    },

    archived: {
      type: Sequelize.BOOLEAN,
      defaultsTo: false,
    },

    ads: {
      type: Sequelize.BOOLEAN,
      defaultsTo: false,
    },

    allowForks: {
      type: Sequelize.BOOLEAN,
      defaultsTo: false,
    },

    forks: {
      type: Sequelize.JSON,
      description: 'e.g. { original: "", arr: [{ emailAddress: "", id: "" }] }',
    },

    dateNow: {
      type: Sequelize.INTEGER,
      autoCreatedAt: true,
    },

    approved: {
      type: Sequelize.BOOLEAN,
      defaultsTo: false,
    },

    hotScore: {
      type: Sequelize.INTEGER,
      // columnType: 'float GENERATED ALWAYS AS (LEAST((1 / ((dateNow - createdAt) / 1000 / 60 / 60 / 24)), 1) * (upvotes + 1))',
      allowNull: true,
      // columnType: 'float',
      // allowNull: true
    },
  });

  return document;
};
