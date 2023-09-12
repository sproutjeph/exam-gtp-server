import { activateUser } from "../../controllers/user/activateUser";
import { loginUser } from "../../controllers/user/loginUser";
import { logoutUser } from "../../controllers/user/logoutUser";
import { registerUser } from "../../controllers/user/registerUser";
import express from "express";
import { isAuthenticated } from "../../middleware/auth";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/activate-user", activateUser);
router.post("/login-user", loginUser);
router.get("/logout-user", isAuthenticated, logoutUser);
// router.route("/api-useage-count").post(getApiUseageCount);

export default router;
