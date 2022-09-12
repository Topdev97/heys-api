module.exports = app => {
    const document = require("../controllers/document.controller.ts");
    const router = require("express").Router();
    // Create a new Document
    router.post("/", document.create);
    // Retrieve all Documents
    router.get("/", document.findAll);
    // Retrieve a single Document with id
    router.get("/:id", document.findOne);
    // Update a Document with id
    router.put("/:id", document.update);
    // Delete a Document with id
    router.delete("/:id", document.deleteOne);
    // Delete all Document
    router.delete("/", document.deleteAll);
    app.use('/api/document', router);
  };