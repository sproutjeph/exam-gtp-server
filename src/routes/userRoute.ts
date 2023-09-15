import { activateUser } from "../controllers/user/activateUser";
import { loginUser } from "../controllers/user/loginUser";
import { logoutUser } from "../controllers/user/logoutUser";
import { registerUser } from "../controllers/user/registerUser";
import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getUserInfo } from "../controllers/user/getUserInfo";
import { updateUserPassword } from "../controllers/user/updateUserPassword";
import { getAllUsers } from "../controllers/user/getAllUsers";
import { updateUserRole } from "../controllers/user/updateUserRole";
import { deleteUser } from "../controllers/user/deleteUser";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/activate-user", activateUser);
router.post("/login-user", loginUser);
router.get("/logout-user", isAuthenticated, logoutUser);
router.get("/me", isAuthenticated, getUserInfo);
router.put("/update-password", isAuthenticated, updateUserPassword);
router.get(
  "/get-all-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
router.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
router.delete(
  "/delete-user:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);
// router.route("/api-useage-count").post(getApiUseageCount);

export default router;
