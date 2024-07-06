import express from "express";

const router = express.Router();

// GET user by ID
router.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// GET all users
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET home page. 
router.get("/", function (req, res, next) {
  res.render("index", { title: "Yay node!", user: req.user });
});

// GET profile page. 
router.get("/profile", function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("profile", { title: "Profile", user: req.user });
});

export default router;
