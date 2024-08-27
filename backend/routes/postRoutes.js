const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPostsBySearch,
  updatePostProfile,
} = require("../controllers/postController");
const upload = require("../services/fileUpload");
const {
  authMiddleware,
  verifyUser,
  isAdmin,
  verifySeller,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/search", getAllPostsBySearch);
router.post(
  "/posts/create",
  authMiddleware,
  verifyUser,
  verifySeller,
  // upload.array("photos", 5),
  createPost
);

router.get("/posts/:postId", getPost);
router.put(
  "/posts/:postId",
  // authMiddleware,
  // verifyUser,
  // verifySeller,
  updatePostProfile
);

router.delete(
  "/posts/:postId",
  authMiddleware,
  verifyUser,
  verifySeller,
  deletePost
);

// for admin
router.post(
  "/admin/posts/create",
  authMiddleware,
  verifyUser,
  isAdmin,
  // upload.array("photos", 5),
  createPost
);

router.put(
  "/admin/posts/:postId",
  authMiddleware,
  verifyUser,
  isAdmin,
  updatePost
);
router.delete(
  "/admin/posts/:postId",
  authMiddleware,
  verifyUser,
  isAdmin,
  deletePost
);

module.exports = router;
