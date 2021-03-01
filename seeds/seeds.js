const { User, Post, Image } = require("../models");
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
    content: "Yoda Meme",
    user_id: "1",
  },
];

const imgdata = [
  {
    img_url:
      "https://images.theconversation.com/files/177834/original/file-20170712-14488-19lw3sc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
  },
];

const seedUsers = async () => {
  await User.bulkCreate(userdata, { individualHooks: true });
};

const seedPosts = async () => {
  await Post.bulkCreate(postdata);
};
const seedImg = async () => {
  await Image.bulkCreate(imgdata);
};

const seedAll = async () => {
  await seedUsers();
  await seedPosts();
  await seedImg();
};

seedAll();

module.exports = { seedAll };
