import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "../data";

const app = express();
const { PORT = 3000 } = process.env;
app.use(bodyParser.json()).use(cors());

app.get("/", (req, res) => res.send("hello world"));

app.get("/api/v1/photos/:id", (req, res) => {
  if (Number.isNaN(parseInt(req.params.id, 10))) {
    return res.status(400).json({ error: "invalid id" });
  }
  const photo = data.photos.find(
    (photo) => photo.id == parseInt(req.params.id)
  );
  if (!photo) {
    return res.status(404).json({ error: "photo not found" });
  }
  return res.json(photo);
});

app.post("/api/v1/photos", (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ error: "no id found" });
  }
  const photo = {
    image: req.body.image,
    id: data.photos.length + 1,
    name: req.body.name,
  };
  data.photos.push(photo);
  return res.status(201).json(photo);
});

app.listen(PORT, () => {
  console.log("Hi, I'm listening on " + PORT);
});
