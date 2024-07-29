const express = require("express");
const { userInfo } = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/user", authenticateToken, userInfo); // 회원 정보
// router.put("/user", authenticateToken); // 회원 정보 수정
// router.delete("/user", authenticateToken); // 회원 탈퇴

// router.get("/user/posts", authenticateToken); // 내가 쓴 게시물

// router.post("/posts", authenticateToken); // 게시글 작성
// router.get("/posts"); // 전체 게시글 가져오기
// router.get("/posts/:postId"); // 게시글 조회
// router.put("/posts/:postId", authenticateToken); // 내 게시글 수정
// router.delete("/posts/:postId", authenticateToken); // 내 게시글 삭제

module.exports = router;
