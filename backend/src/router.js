const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const memberControllers = require("./controllers/memberControllers");

router.get("/members", memberControllers.browse);
router.get("/members/:id", memberControllers.read);
router.post("/members", memberControllers.add);

module.exports = router;
