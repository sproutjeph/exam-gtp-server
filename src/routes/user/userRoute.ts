import express from "express";
import {
  saveUserToDB,
  getApiUseageCount,
} from "../../controllers/user/userController";

const router = express.Router();

router.route("/").post(saveUserToDB);
router.route("/api-useage-count").post(getApiUseageCount);

export default router;
