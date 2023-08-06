import { Router } from "express";
import { SolModel } from "../../Schemas";

const router = Router();

router.get("/", async (req, res) => {
  const data = await SolModel.find({
    Ques_id: req.query.ques_id,
    User_id: req.query.user_id,
    _id: req.query.id,
  });
  res.status(200).json({
    isError: false,
    data,
  });
});

router.post("/", async (req, res) => {
  const { Ques_id, User_id, Lang_id } = req.body;
  const data = await SolModel.create({
    Ques_id,
    User_id,
    Lang_id,
    Status: "Pending",
  });
  res.status(200).json({
    isError: false,
    data,
  });
});

router.put("/:solID", async (req, res) => {
  const { Time_taken, Status } = req.body;
  const data = await SolModel.findByIdAndUpdate(req.params.solID, {
    Time_taken,
    Status,
  });

  res.status(200).json({
    isError: false,
    data,
  });
});

export default router;
