const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const verifyJWT = require("../middlewares/verifyJWT");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports = (app) => {
  app.post("/api/register", (req, res) => {
    const {
      name = "Define Username",
      username,
      email = "Define email",
      password,
    } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        name,
        username,
        email,
        password: hash,
      })
        .then((newUser) => {
          console.log({ newUser });
          res.json({ success: true, msg: "User created." });
        })
        .catch((err) => {
          if (err) {
            res.status(400).json({ error: err });
          }
        });
    });
  });

  app.post("/api/login", async (req, res) => {
    console.log({ req: req.body });
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username } });

    if (!user) res.json({ auth: false, message: "User Doesn't Exist" });

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res.json({
          auth: false,
          message: "Wrong Email and Password Combination!",
        });
      } else {
        const accessToken = jwt.sign({ email: user.email }, "jwtSecret", {
          expiresIn: 60 * 60 * 24,
        });

        // req.session.user = user;

        res.json({
          auth: true,
          token: accessToken,
          result: user,
          message: "User authenticated!",
        });
      }
    });
  });

  app.post("/api/logout", verifyJWT, (req, res) => {
    res.json("Logged out successfully");
  });

  app.get("/api/isUserAuth", verifyJWT, (req, res) => {
    res.json({ auth: true, message: "You are authenticated!" });
  });
};
