const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

// Set the view engine to ejs
app.set("view engine", "ejs");

// Body-parser to parse request body
app.use(bodyParser.urlencoded());

// Static files
app.use(express.static("public"));

// Enabling session
app.use(
  session({
    secret: "some_secret_key",
    cookie: {},
  })
);

const layouts = require("express-ejs-layouts");

// Use layouts
app.use(layouts);
app.set("layout", "layouts/main.ejs");

// Place all styles block in the layout at the head
app.set("layout extractStyles", true);

// Place all scripts block in the layout at the end
app.set("layout extractScripts", true);

// Routes
const index = require("./routes/index");
const auth = require("./routes/auth");
const todo = require("./routes/todo");

app.use("/", index);
app.use("/auth", auth);
app.use("/todo", todo);

// Start server on port 3000
app.listen(3000);
console.log("Server runs at port 3000...");