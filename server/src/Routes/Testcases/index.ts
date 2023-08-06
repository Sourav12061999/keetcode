import { Router } from "express";
import { AuthMiddleware } from "../../middleware";
import { TestcaseModel } from "../../Schemas";

const router = Router();

router.get("/:courseID", AuthMiddleware(), async (req, res) => {
  const data = await TestcaseModel.find({ Ques_id: req.params.courseID });
  res.status(200).json({
    isError: false,
    data,
  });
});
router.post("/:courseID", AuthMiddleware(), async (req, res) => {
  const { Input, Output, Timelimit, Ques_id } = req.body;
  const data = await TestcaseModel.create({
    Input,
    Output,
    Timelimit,
    Ques_id,
  });
  res.status(200).json({
    isError: false,
    data,
  });
});

router.put("/:testcaseID", AuthMiddleware(), async (req, res) => {
  const { Input, Output, Timelimit, Ques_id } = req.body;

  const data = await TestcaseModel.findByIdAndUpdate(req.params.testcaseID, {
    Input,
    Output,
    Timelimit,
    Ques_id,
  });

  res.status(200).json({
    isError: false,
    data,
  });
});

export default router;
