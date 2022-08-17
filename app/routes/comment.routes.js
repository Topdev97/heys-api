module.exports = app => {
    const comment = require("../controllers/comment.controller.js");
    var router = require("express").Router();
    // Create a new comment
    router.post("/", comment.create);
    // Retrieve all comments
    router.get("/", comment.findAll);
    // Delete a comment with id
    router.delete("/:id", comment.delete);
    // Delete all comment
    router.delete("/", comment.deleteAll);
    app.use('/api/comment', router);
  };