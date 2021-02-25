const router = require("express").Router();
const sequelize = require("../config/connection");
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({});

    if (!comments) {
      res.status(404).json({ message: "There are no comments" });
      return;
    }
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    if (req.session) {
      const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      res.json(newComment);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/", withAuth, async (req, res) => {
  try {
  }
});
