const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const upload = require("../services/fileUpload");
const {
  isAdmin,
  authMiddleware,
  verifyUser,
} = require("../middlewares/authMiddleware");
const { verify } = require("jsonwebtoken");

const router = express.Router();

/// for user routes
router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.get("/users/logout", logoutUser);
router.get("/users", authMiddleware, verifyUser, getUser);
router.get("/allUsers", getAllUsers);

// admin routes
router.get("/admin/users/", authMiddleware, verifyUser, isAdmin, getAllUsers);
router.put("/admin/users/:id", authMiddleware, verifyUser, isAdmin, updateUser);
router.delete(
  "/admin/users/:id",
  authMiddleware,
  verifyUser,
  isAdmin,
  deleteUser
);

module.exports = router;
