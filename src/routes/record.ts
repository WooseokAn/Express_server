import { Router } from "express";
import { createRecord, retrieveAllRecord, retrieveLastestRecord } from "../controller/record";

const router = Router();

router.post("/:deviceCode", createRecord);

router.get("/:deviceCode", retrieveLastestRecord);

router.get("/:deviceCode/list", retrieveAllRecord);

export default router;
