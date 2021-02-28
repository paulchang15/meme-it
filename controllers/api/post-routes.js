const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment, Vote, Image } = require("../../models");
const withAuth = require("../../utils/auth");
const { fileUpload, urlUpload } = require("../../utils/imgur");

router.get("/", async (req, res) => {
  try {
    const post = await Post.findAll({
      attributes: ["id", "content", "title", "created_at"],
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
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
              ),
              "vote_count",
            ],
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

router.post("/", async (req, res) => {
  try {
    const postCreate = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id, // add back req.session.user_id when login works
    });
    res.json(postCreate);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/upvote", async (req, res) => {
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

router.post("/image", async (req, res) => {
  try {
    // need front end function that selects url/file upload feature
    // make a post to a user to test the route
    // if (urlupload) {
    //   urlUpload();
    //   const image = await Image.create({
    //     where: {
    //       post_id: req.params.post_id,
    //       user_id: req.params.user_id,
    //     },
    //   });
    //   res.json(image);
    // }
    // if (file) {
    let file = await fileUpload();
    const postCreate = await Post.create({
      title: "test",
      content: "test",
      user_id: 1, // add back req.session.user_id when login works
    });
    const image = await Image.create({
      where: {
        post_id: postCreate.post_id,
        user_id: 1,
        img_url: file,
      },
    });

    res.json(image);
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/image", async (req, res) => {
  try {
    const image = await Image.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!image) {
      res.status(404).json({ message: "No image found with this id " });
      return;
    }
    res.json(image);
  } catch (err) {}
});
router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
