import { Router } from "express";
import { registerCamera, retrieveAllCamera, retrieveOneCamera } from "../controller/camera";

const router = Router();

router.post("/", registerCamera);

router.get("/", retrieveAllCamera);

router.get("/:deviceCode", retrieveOneCamera);

router.put("/:deviceCode", (req, res) => {
  res.json({
    message: "아직 구현되지 않은 API Endpoint 입니다.",
  });
});

router.delete("/:deviceCode", (req, res) => {
  res.json({
    message: "아직 구현되지 않은 API Endpoint 입니다.",
  });
});

export default router;
