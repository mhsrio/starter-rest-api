const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const awsConfigs = {
  region: process.env.AWS_REGION,
  endpoint: "https://dynamodb.ap-southeast-2.amazonaws.com",
};

const ddbClient = new DynamoDBClient(awsConfigs);

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};

const unMarshallOptions = {
  wrapNumbers: false,
};

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions,
  unMarshallOptions,
});
module.exports = {
  ddbDocClient,
};
