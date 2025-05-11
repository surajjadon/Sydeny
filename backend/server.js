const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/submit", (req, res) => {
  const { email, agree, eventTitle } = req.body;

  if (!email || !agree) {
    return res.status(400).json({ error: "Email and agreement required" });
  }

  console.log("User email:", email, "Event:", eventTitle);
  res.status(200).json({ message: "Email received" });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
