const router = require("express").Router();
const { ConsoleWriter } = require("istanbul-lib-report");
const sequelize = require("../../config/connection");
const { Post, User, Comment, Vote, Image } = require("../../models");
const withAuth = require("../../utils/auth");
// const { fileUpload, urlUpload } = require("../../utils/imgur"); I think this is one of those random requires that vscode just adds without being told to

router.get("/", async (req, res) => {
  try {
    const post = await Post.findAll({
      attributes: [
        "id", 
        "content", 
        "title", 
        "created_at",
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
            "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
        { model: Image, 
          attributes: [
            "img_url"
          ] 
        },
      ],
    });
    if (!post) {
      res.status(404).json({ message: "There are no posts yet" });
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
      attributes: [
      "id", 
      "content", 
      "title", 
      "created_at",
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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


router.post("/", async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id, // add back req.session.user_id when login works
    });
    const image = await Image.create({
      post_id: post.post_id,
      user_id: req.session.user_id,
      img_url: req.body.img_url,
    });

    res.json({ post, image });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.post("/", async (req, res) => { I think this route above this one replaces the need for this one right?
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

router.put("/upvote", async (req, res) => {
  try {
      if (req.session) {
        const upVote = await Post.upvote(
          {
            ...req.body,
            user_id: req.session.user_id,
          },
          { Vote, Comment, User }
        );
        res.json(upVote);
      } 
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
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
      }
    });
    if (!deletePost) {
      res.status(404).json({ message: "No post found with this id " });
      return;
    }
    res.json(deletePost);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
