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
  {
    username: "dstanmer3",
    email: "ihellier3@goo.ne.jp",
    password: "password123",
  },
  {
    username: "djiri4",
    email: "gmidgley4@weather.com",
    password: "password123",
  },
  {
    username: "msprague5",
    email: "larnout5@imdb.com",
    password: "password123",
  },
  {
    username: "mpergens6",
    email: "hnapleton6@feedburner.com",
    password: "password123",
  },
  {
    username: "tpenniell7",
    email: "kperigo7@china.com.cn",
    password: "password123",
  },
  {
    username: "msabbins8",
    email: "lmongain8@google.ru",
    password: "password123",
  },
  {
    username: "jmacarthur9",
    email: "bsteen9@epa.gov",
    password: "password123",
  },
];

const seedUsers = () => {
  User.bulkCreate(userdata, { individualHooks: true });
};

const postdata = [
  {
    title: "Donec posuere metus vitae ipsum.",
    content: "Yoda Meme",
    user_id: 1,
  },
  //   // {
  //   //   title: 'Morbi non quam nec dui luctus rutrum.',
  //   //   content: 'https://nasa.gov/donec.json',
  //   //   user_id: 8
  //   // },
  //   // {
  //   //   title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
  //   //   content: 'https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx',
  //   //   user_id: 1
  //   // }
];

// const imgdata = [
//   {
//     img_url:
//       "https://images.theconversation.com/files/177834/original/file-20170712-14488-19lw3sc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
//   },
// ];

// const seedImg = async () => {
//   await Image.bulkCreate(imgdata);
// };

const seedPosts = () => {
  Post.bulkCreate(postdata);
};

const seedAll = () => {
  seedUsers();
  seedPosts();
  // seedImg();
};

seedAll();

module.exports = { seedAll };
