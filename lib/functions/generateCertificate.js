import { document } from "../utils/dynamodbClient";
exports.handle = async (event) => {
    const { id, name, grade } = JSON.parse(event.body);
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
//# sourceMappingURL=generateCertificate.js.map