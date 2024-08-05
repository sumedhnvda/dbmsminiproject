import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@8217nvda",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("express running");
});

app.get("/photos", (req, res) => {
  const q = "SELECT * FROM photos";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/photos", (req, res) => {
  const q = "INSERT INTO photos(`title`, `desc`,`cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/photos/:id", (req, res) => {
  const PhotoId = req.params.id;
  const q = " DELETE FROM photos WHERE id = ? ";

  db.query(q, [PhotoId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/photos/:id", (req, res) => {
  const PhotoId = req.params.id;
  const q = "UPDATE photos SET `title`= ?, `desc`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
  ];

  db.query(q, [...values,PhotoId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});