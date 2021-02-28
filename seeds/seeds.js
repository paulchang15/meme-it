const { User, Post } = require("../models");
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


const seedUsers = async () => {
  await User.bulkCreate(userdata, { individualHooks: true });
};
// seedUsers();

const postdata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    content: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    user_id: 10
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    content: 'https://nasa.gov/donec.json',
    user_id: 8
  },
  {
    title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    content: 'https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx',
    user_id: 1
  }
  
];



const seedPosts = async () => { 
  await Post.bulkCreate(postdata);
};

const seedAll = async () => {
  seedUsers();
  seedPosts();
};


seedAll();

module.exports = {seedAll};
