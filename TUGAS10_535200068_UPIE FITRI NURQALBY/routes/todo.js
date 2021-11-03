const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("pages/todo", { tasks: req.session.tasks });
});

router.post("/add", async (req, res) => {
  
  // If there's no tasks in the session, create one
  if (!req.session.tasks) {
    req.session.tasks = [];
  }

  // Add new task
  const newTask = req.body.taskName;
  req.session.tasks.push(newTask);

  res.redirect("/todo");
});

router.post("/done/:index", async (req, res) => {
  
  // Get the index of the task to be deleted
  const index = req.params.index;

  // Only delete if there's that task
  if (req.session.tasks && index < req.session.tasks.length) {
    req.session.tasks.splice(index, 1);
  }

  res.redirect("/todo");
});

module.exports = router;