const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
console.log("this is the port", PORT); //REMOVE

var corsOptions = {
  origin: [
    `http://localhost:${PORT}`,
    "https://test-survey-project.herokuapp.com",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/", express.static(path.join(__dirname, "client", "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import your models
require("./models/survey");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yospw.mongodb.net/comp229?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

//import routes
require("./routes/surveyRoutes.js")(app);

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
