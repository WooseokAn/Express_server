import { Router } from "express";
import { createSection, retrieveAllSection, retrieveOneSection, retrieveCongestion } from "../controller/section";

const router = Router();

router.post("/", createSection);

router.get("/", retrieveAllSection);

router.get("/:sectionId", retrieveOneSection);

router.get("/:sectionId/congestion", retrieveCongestion);

export default router;
