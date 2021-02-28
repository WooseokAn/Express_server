"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var section_1 = require("../controller/section");
var router = express_1.Router();
router.post("/", section_1.createSection);
router.get("/", section_1.retrieveAllSection);
router.get("/:sectionId", section_1.retrieveOneSection);
router.get("/:sectionId/congestion", section_1.retrieveCongestion);
exports.default = router;
