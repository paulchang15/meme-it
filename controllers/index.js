const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes.js");

router.use("/", homeRoutes);

router.use("/api", apiRoutes);

router.use("/dashboard", dashboardRoutes);

// router.use((req, res) => {  Not sure what this is doing or if we need it?
//   res.status(404).end();
// });

module.exports = router;
