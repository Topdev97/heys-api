module.exports = (app) => {
  require("./gathering.routes")(app);
  require("./document.routes.js")(app);
  require("./comment.routes.js")(app);
  require("./tag.routes.js")(app);
};
