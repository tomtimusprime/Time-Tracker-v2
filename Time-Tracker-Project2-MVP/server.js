require("dotenv").config();
const express = require("express");
var cookieParser = require('cookie-parser')
const user = require("./controller/user-controller.js");
const authorize = require("./controller/auth-controller.js");
const dashboard = require("./controller/dashboard-controller.js");
const html = require("./controller/html-routes.js");
const tracker = require("./controller/tracker-controller.js")


const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(user);
app.use(authorize);
app.use(dashboard);
app.use(html);
app.use(tracker);



const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
const startServer = async () => {
  await db.sequelize.sync(syncOptions);

  app.listen(PORT, () => {
    console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
  });
};

startServer();
