const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { awsRegion, awsEndPointUrl } = require('./variables');

const awsConfigs = {
  region: awsRegion,
  endpoint: awsEndPointUrl
};


const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false
};

const unMarshallOptions = {
  wrapNumbers: false
};

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions,
  unMarshallOptions
});
module.exports = {
  ddbDocClient
};
