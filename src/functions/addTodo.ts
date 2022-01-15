import { v4 } from "uuid";
import { document } from "../utils/dynamodbClient";

interface ICreateCertificate {
  title: string;
  deadline: string;
}

export const handle = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateCertificate;

  await document
    .put({
      TableName: "users_todos",
      Item: {
        id: v4(),
        user_id,
        title,
        done: true,
        deadline: new Date(deadline),
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
