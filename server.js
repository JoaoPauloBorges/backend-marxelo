const express = require("express");
const path = require("path");
const app = express();

const upload = require("multer")();

// Parse Json Middleware
app.use(express.json());
// Parse x-www-form-urlencoded Middleware
app.use(express.urlencoded({ extended: true }));
// Parse multipart/form-data Middleware
app.use(upload.array());

const dataFromServer = [];

app.get("/api/answers", async (req, res) => {
  let data = [...dataFromServer];

  const limit = req.query.limit || data.length;
  const total = data.length;
  const page = req.query.page || 1;

  const offset = (page - 1) * limit;

  if (total > limit) {
    data = [...data.splice(offset, limit)];
  }

  res.send({
    data,
    total,
  });
});

app.post("/api/answers", async (req, res) => {
  try {
    const payload = req.body;
    console.log({ payload });
    dataFromServer.push(payload);
    res.sendStatus(200);
  } catch (e) {
    res.send(e);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
