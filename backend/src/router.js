const express = require("express");

const router = express.Router();

const memberControllers = require("./controllers/memberControllers");

router.get("/members", memberControllers.browse);
router.get("/members/:id", memberControllers.read);
router.post("/members", memberControllers.add);
router.put("/members/:id", memberControllers.edit);
router.delete("/members/:id", memberControllers.destroy);

const tagControllers = require("./controllers/tagControllers");

router.get("/tags", tagControllers.browse);

module.exports = router;
