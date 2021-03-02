const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Image } = require("../models");
const withAuth = require("../utils/auth");

//make sure to add withAuth to all the routes after we test them
router.get("/", async (req, res) => {
  try {
    // console.log(req.body.user_id);
    const allPosts = await Post.findAll({
      where: {
        // user_id: req.session.id, // change back to req.session.user_id after session set up
        user_id: 1,
      },
      attributes: [
        "id",
        "title",
        "created_at",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
          ),
          "vote_count",
        ],
      ],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
        { model: Image, attributes: ["img_url"] },
      ],
    });
    const posts = await allPosts.map((post) => post.get({ plain: true }));

    if (!allPosts) {
      res.status(404).json({ message: "No posts found!" });
      return;
    }
    console.log(posts);
    await res.render("dashboard", { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id, // change back to req.session.user_id
  });
  res.json(post);
});

module.exports = router;
