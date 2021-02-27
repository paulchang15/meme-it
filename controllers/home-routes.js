const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  console.log("---------HOMIEEEEE ROUTESSSS-----------");
  try {
    console.log(req.session);
    const findPosts = await Post.findAll({
      attributes: [
        "id",
        "post_url",
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
      ],
    });

    const posts = await findPosts.map((post) => post.get({ plain: true }));
    console.log(findPosts[0]);
    const render = res.render("homepage", {
      posts,
      //   loggedIn: req.session.loggedIn,
    });

    res.json(findPosts, posts, render);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/", (req, res) => {
//   res.render("homepage");
// });

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
        "post_url",
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
      ],
    });
    if (!findPost) {
      res.status(404).json({ message: "No post found!" });
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.json(findPost);

    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
