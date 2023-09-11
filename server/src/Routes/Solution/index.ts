import { Router } from "express";
import { SolModel } from "../../Schemas";
import AWS from "aws-sdk";
import { AWS_REGION, SQS_URL } from "../../constants";
import { Promisify } from "../../Utils/Promisify";
const router = Router();

const sqs = new AWS.SQS({
  region: AWS_REGION,
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

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

  const params: AWS.SQS.SendMessageRequest = {
    MessageBody: data["_id"],
    QueueUrl: SQS_URL,
  };
  await Promisify<AWS.SQS.SendMessageRequest>(sqs.sendMessage, params);
  res.status(200).json({
    isError: false,
    data,
  });
});

router.put("/:solID", async (req, res) => {
  const { Time_taken, Status, Error } = req.body;
  const data = await SolModel.findByIdAndUpdate(req.params.solID, {
    Time_taken,
    Status,
    Error,
  });

  res.status(200).json({
    isError: false,
    data,
  });
});

export default router;
