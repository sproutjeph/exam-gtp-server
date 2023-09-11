import { activateUser } from "../../controllers/user/activateUser";
import { registerUser } from "../../controllers/user/registerUser";
import express from "express";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/activate-user", activateUser);
// router.route("/api-useage-count").post(getApiUseageCount);

export default router;
