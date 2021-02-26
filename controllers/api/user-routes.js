const router = require("express").Router();
const { User, Post, Vote, Comment } = require("../../models");
const sequelize = require("../../config/connection");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    if (!users) {
      res.status(404).json({ message: "There are currently no users" });
      return;
    }
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
        {
          model: Post,
          attributes: ["title"],
          through: Vote,
          as: "voted_posts",
        },
      ],
    });
    if (!user) {
      res.status(404).json({ message: "There is no user with this id" });
      return;
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userPost = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // if something is wrong here, might need to change .then() to await
    const userSave = await ((dbUserData) => {
      req.session.save(() => {
        (req.session.user_id = dbUserData.id),
          (req.session.username = dbUserData.username),
          (req.session.loggedIn = true);
      });
    });
    res.json(userPost);
    res.json(userSave);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const User = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userLogin) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const userLogin = await ((dbUserData) => {
      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }

      req.session.save(() => {
        (req.session.user_id = dbUserData.id),
          (req.session.username = dbUserData.username),
          (req.session.loggedIn = true);
        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    });
    res.json(User).then(res.json(userLogin));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userUpdate = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });
    if (!userUpdate) {
      res
        .status(404)
        .json({ message: "There are currently no user with that id" });
      return;
    }
    res.json(userUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userDestroy = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userDestroy) {
      res.status(404).json({ message: "no user found with this id" });
      return;
    }
    res.json(userDestroy);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
