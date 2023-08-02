import express from "express";
import { ErrorHandlerMiddleware } from "./middleware";
import { AuthRouter } from "./Routes";

const app = express();
app.use(ErrorHandlerMiddleware);

app.get("/home", (req, res) => {
  res.status(200).json({
    isError: false,
    msg: "All OK",
  });
});

app.use("/api/auth", AuthRouter);
app.listen(3001, () => {
  console.log("Keetcode Server Started");
});
