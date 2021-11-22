const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const bcrypt = require('bcrypt');
module.exports = (app) => {
  app.get(`/users`, async (req, res) => {
    try {
      const users = await Users.find();
      console.log({ users });
      return res.json(users);
    } catch (error) {
      return res.send(error);
    }
  });

  app.get(`/users/:id`, async (req, res) => {
    let id = req.params.id;
    try {
      const user = await Users.findById(id);
      console.log({ user });
      return res.json(user);
    } catch (error) {
      return res.send(error);
    }
  });

  app.post(`/users/add`, async (req, res) => {
    let newUser = Users({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      //add bcrypt to password
    });
    Users.create(newUser, (err, user) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        console.log('User created!', user);
        res.json({ success: true, msg: 'New user added!.' });
      }
    });
  });
  app.get(`/users/delete/:id`, async (req, res, next) => {
    let id = req.params.id;
    Users.remove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true, msg: 'Survey deleted.' });
      }
    });
  });
  app.get(`/users/update/:id`, async (req, res, next) => {
    let id = req.params.id;
    Users.findById(id, (err, userToEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true, msg: '', user: userToEdit });
      }
    });
  });
  app.post(`/users/update/:id`, async (req, res, next) => {
    let id = req.params.id;
    let updateUser = Users({
      _id: id,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    Users.updateOne({ _id: id }, updateUser, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({
          success: true,
          msg: 'User updated.',
          survey: updateUser,
        });
      }
    });
  });

  app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        name,
        email,
        password: hash,
      })
        .then((newUser) => {
          console.log({ newUser });
          res.json({ success: true, msg: 'User created.' });
        })
        .catch((err) => {
          if (err) {
            res.status(400).json({ error: err });
          }
        });
    });
  });

  app.post('/login', async (req, res) => {
    const { name, email, password } = req.body;

    const user = await Users.findOne({ where: { name } });

    if (!user) res.json({ auth: false, message: "User Doesn't Exist" });

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res.json({
          auth: false,
          message: 'Wrong Email and Password Combination!',
        });
      } else {
        const accessToken = jwt.sign({ email: user.email }, 'jwtSecret', {
          expiresIn: 60 * 60 * 24,
        });

        // req.session.user = user;

        res.json({
          auth: true,
          token: accessToken,
          result: user,
          message: 'User authenticated!',
        });
      }
    });
  });

  const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log(token);
    if (token === null) {
      res.send({ auth: false, message: 'There is no token!' });
    } else {
      jwt.verify(token, 'jwtSecret', (err, decoded) => {
        if (err) {
          res.json({ auth: false, message: 'Authentication failed!' });
        } else {
          req.userEmail = decoded.email;
          next();
        }
      });
    }
  };

  app.post('/logout', verifyJWT, (req, res) => {
    res.json('Logged out successfully');
  });

  app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.json({ auth: true, message: 'You are authenticated!' });
  });
};
