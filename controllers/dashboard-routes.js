const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Image } = require("../models");
const withAuth = require("../utils/auth");

//make sure to add withAuth to all the routes after we test them
router.get("/", withAuth, async (req, res) => {
  try {
    // console.log(req.body.user_id);
    const allPosts = await Post.findAll({
      where: {
        user_id: req.session.id,
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

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    console.log(req.body.user_id);
    const editPosts = await Post.findAll({
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

    if (!editPosts) {
      res.status(404).json({ message: "No posts found!" });
      return;
    }

    const posts = await editPosts.map((post) => post.get({ plain: true }));

    await res.render("edit-post", {
      posts,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
