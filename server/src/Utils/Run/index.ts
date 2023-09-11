import { AWS_REGION } from "../../constants";
import AWS from "aws-sdk";
import { SQS_URL } from "../../constants";
import { SolModel } from "../../Schemas";
const sqs = new AWS.SQS({
  region: AWS_REGION,
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});
async function RunTheSol() {
  setTimeout(() => {
    const receiveParams = {
      QueueUrl: SQS_URL,
      MaxNumberOfMessages: 1,
      AttributeNames: ["All"],
      MessageAttributeNames: ["All"],
    };
    Execution("");
  }, 100);
}

async function Execution(solID: string) {
  const sol = await SolModel.findById(solID);
  if (sol?.Status) return;
}

export { RunTheSol };
