import { document } from "../utils/dynamodbClient";

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

exports.handle = async (event) => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  console.log("aaa");

  await document
    .put({
      TableName: "users_certificates",
      Item: {
        id,
        name,
        grade,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificate created!",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
