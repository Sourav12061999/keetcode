import { Router } from "express";
import { DescriptionModel, QuestionModel } from "src/Schemas";
import { AuthMiddleware } from "../../middleware";

const router = Router();

router.post("/create-question", AuthMiddleware(), async (req, res) => {
  const { Title, Tags, Difficulty, Content, Boilerplate } = req.body;
  const description = await DescriptionModel.create({
    Content,
    Boilerplate,
  });

  const question = await QuestionModel.create({
    Title,
    Tags,
    Difficulty,
    Description_id: description._id,
    Creator_id: res.locals.user._id,
  });

  res.status(200).json({
    isError: false,
    data: {
      question,
      description,
    },
  });
});

router.put("/update-question", AuthMiddleware(), async (req, res) => {});
export default router;
