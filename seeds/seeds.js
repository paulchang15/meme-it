const { User, Post, Image, Comment, Vote } = require("../models");
const sequelize = require("../config/connection");
const userdata = [
  {
    username: "alesmonde0",
    email: "nwestnedge0@cbc.ca",
    password: "password123",
  },
  {
    username: "jwilloughway1",
    email: "rmebes1@sogou.com",
    password: "password123",
  },
  {
    username: "iboddam2",
    email: "cstoneman2@last.fm",
    password: "password123",
  },
];

const postdata = [
  {
    title: "Donec posuere metus vitae ipsum.",
    user_id: 1,
  },
  {
    title: "Donec posuere metus vitae ipsum.",
    content: "Pikachu Meme",
    user_id: 2,
  },
  // {
  //   title: "Donec posuere metus vitae ipsum.",
  //   content: "Yoda Meme",
  //   user_id: 3,
  // },
];

const imgdata = [
  {
    img_url:
      "https://images.theconversation.com/files/177834/original/file-20170712-14488-19lw3sc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
    user_id: 1,
    post_id: 1,
  },
  {
    img_url: "https://i.redd.it/ig5u8ke5qo421.png",
    user_id: 2,
    post_id: 2,
  },
];

const commentData = [
  {
    comment_text: "test comment",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "LOL",
    user_id: 2,
    post_id: 2,
  },
];

const voteData = [
  {
    user_id: 1,
    post_id: 1,
  },
];
const seedUsers = async () => {
  await User.bulkCreate(userdata, { individualHooks: true });
};

const seedPosts = async () => {
  await Post.bulkCreate(postdata);
};

const seedComments = async () => {
  await Comment.bulkCreate(commentData);
};

const seedImg = async () => {
  await Image.bulkCreate(imgdata);
};

const seedVote = async () => {
  await Vote.bulkCreate(voteData);
};

const seedAll = async () => {
  await seedUsers();
  await seedPosts();
  await seedComments();
  await seedImg();
  await seedVote();
};

seedAll();

module.exports = { seedAll };
