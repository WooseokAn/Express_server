"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var record_1 = require("../controller/record");
var router = express_1.Router();
router.post("/:deviceCode", record_1.createRecord);
router.get("/:deviceCode", record_1.retrieveLastestRecord);
router.get("/:deviceCode/list", record_1.retrieveAllRecord);
exports.default = router;
