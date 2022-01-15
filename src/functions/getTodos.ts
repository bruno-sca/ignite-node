import { document } from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { user_id } = event.pathParameters;

  console.log(user_id);

  const response = await document
    .scan({
      TableName: "users_todos",
      FilterExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      todos: response.Items,
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
