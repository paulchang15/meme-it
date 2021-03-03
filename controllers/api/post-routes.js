const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment, Vote, Image } = require("../../models");
const withAuth = require("../../utils/auth");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const post = await Post.findAll({
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
    if (!post) {
      res.status(404).json({ message: "There is no post with this id " });
      return;
    }
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postId = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "created_at"],
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

        { model: Image, attributes: ["img_url"] },
      ],
    });
    if (!postId) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(postId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const postCreate = await Post.create({
//       title: req.body.title,
//       content: req.body.content,
//       user_id: req.session.user_id, // add back req.session.user_id when login works
//     });
//     res.json(postCreate);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.put("/upvote", withAuth, async (req, res) => {
  try {
    const upVote = await Post.upvote(
      {
        ...req.body,
        user_id: req.session.user_id,
      },
      { Vote, Comment, User }
    );
    res.json(upVote);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    console.log(typeof req.body.img_url);

    const newPost = await axios.post(
      `https://api.imgur.com/3/image`,
      { image: req.body.img_url },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Client-ID ebe2f73bc0d1a0d",
        },
      }
    );
    console.log(newPost.data);
    const post = await Post.create({
      title: req.body.title,

      user_id: req.session.user_id,
    });
    const image = await Image.create({
      post_id: req.body.post_id,
      user_id: req.session.user_id,
      img_url: newPost.data.data.link,
    });

    // res.send(newPost.data.link);
    res.json(image);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/image", async (req, res) => {
  try {
    const image = await Image.findAll({});
    if (!image) {
      res.status(404).json({ message: "No image found with this id " });
      return;
    }
    res.json(image);
  } catch (err) {}
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const upDate = await Post.update(
      {
        title: req.body.title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!upDate) {
      res.status(404).json({ message: "No post found with this id " });
      return;
    }
    res.json(upDate);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletePost) {
      res.status(404).json({ message: "No post found with this id " });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
