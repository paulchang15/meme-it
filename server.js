const express = require("express");
const routes = require("./controllers"); //The module does not require routes here I notice.
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const { helpers, image } = require("./utils/index"); //This is different in the module too so just want to note it
const hbs = exphbs.create({ helpers, image }); //This is also slightly different I just wanted to note it
const axios = require("axios");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //This was set to extended: false in the module
app.use(express.static(path.join(__dirname + "/public")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const sess = {
  secret: "Super secret secret",
  // cookie: {
  //   expires: 10 * 60 * 1000,
  // },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
// turn on routes
app.use(routes); //In the module I believe they use app.use(require('./controllers/')) instead of this way but I think it's doing the same thing right?

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
