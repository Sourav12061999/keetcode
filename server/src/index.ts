import express from "express";

const app = express();

app.get("/home", (req, res) => {
  res.status(200).json({
    isError: false,
    msg: "All OK",
  });
});
app.listen(3001, () => {
  console.log("Keetcode Server Started");
});
