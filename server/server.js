const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist/jarrys-solution-survey-project"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/jarrys-solution-survey-project/" })
);

app.listen(PORT, () => {
  console.log(`Server set up on port ${PORT}`);
});
