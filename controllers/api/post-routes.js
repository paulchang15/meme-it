const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment, Vote, Image } = require("../../models");
const withAuth = require("../../utils/auth");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const sortBy = req.body.sort;
    const postDefault = await Post.findAll({
      attributes: [
        "id",
        "title",
        "created_at",
        [
          await sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
          ),
          "vote_count",
        ],
        // [
        //   await (Sequelize.literal(
        //     `MAX(CASE Type WHEN 'vote_count' THEN post_id ELSE 0 END)`
        //   ),
        //   "Employee"),
        // ],
      ],

      order: ["created_at", "DESC"],

      // where: {
      //   Type: []
      // }

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

    const voteCount = await Post.findAll({
      attributes: [
        "id",
        "title",
        "created_at",
        [
          await sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
          ),
          "vote_count",
        ],
      ],

      order: ["vote_count", "DESC"],

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

    // switch to differentiate which option was chosen from front end
    switch (sortBy) {
      case "newest":
        await postDefault;
        break;
      case "votes":
        await voteCount;
        break;
      default:
        postDefault;
        break;
    }
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

router.post("/upvote/", withAuth, async (req, res) => {
  try {
    // Logic to unvote after voted

    const voted = {
      ...req.body,
      user_id: req.session.user_id,
    };
    // find a vote by the id value, according to the user_id and post_id
    const vote = await Vote.findOne({
      where: {
        user_id: voted.user_id,
        post_id: voted.post_id,
      },
      attributes: ["id"],
    });

    // check vote value,  if upvoted, then delete vote data
    if (vote !== null) {
      await Vote.destroy({
        where: {
          id: vote.id,
        },
      });
      // sends vote deleted as response which triggers page refresh, updating vote count
      res.send("vote deleted");
    } else {
      Post.upvote(voted, { Vote, Comment, User, Image });
      // sends voted as response which triggers page refresh, updating vote count
      res.send("voted");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    // console.log(typeof req.body.img_url);

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
    console.log("The post is --------------------------");
    console.log(JSON.stringify(post));
    const image = await Image.create({
      post_id: post.id,
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
    const image = await Image.findOne({});
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
