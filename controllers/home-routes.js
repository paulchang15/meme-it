const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Image } = require("../models");

router.get("/", async (req, res) => {
  try {
    const findPosts = await Post.findAll({
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
      order: [["created_at", "DESC"]],
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

    const posts = await findPosts.map((post) => post.get({ plain: true }));
    // console.log("-----------------homepage posts---------------------");
    // console.log(posts);
    await res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }

    res.render("login");
  } catch (err) {
    res.status(404).res.json({ message: "unable to log in" });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const findPost = await Post.findOne({
      where: {
        id: req.params.id,
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
    if (!findPost) {
      res.status(404).json({ message: "No post found!" });
      return;
    }
    const post = await findPost.get({ plain: true });
    await res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
