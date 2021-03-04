const router = require("express").Router();
// const sequelize = require("../../config/connection");  I dont think we need sequelize because we are not calling it anywhere
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();

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
        user_id: req.session.user_id,
        post_id: req.body.post_id,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/", withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteComment) {
      res.status(404).json({ message: "Can not find comment to delete" });
      return;
    }
    res.json(deleteComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
