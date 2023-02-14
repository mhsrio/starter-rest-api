const express = require("express");
const app = express();
const db = require("@cyclic.sh/dynamodb");
const { ddbDocClient } = require("./config");
const {
  PutCommand,
  GetCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))
// #############################################################################

app.get("/user/gsi", async (req, res) => {
  const params = {
    TableName: "drab-jade-caiman-sariCyclicDB",
    IndexName: "gsi_prj",
    KeyConditionExpression: "gsi_prj = :gsi",
    ExpressionAttributeValues: {
      ":gsi": "springrain",
    },
  };

  const data = await ddbDocClient.send(new QueryCommand(params));
  return res.status(200).json({
    data: data.Items,
  });
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  const params = {
    TableName: "drab-jade-caiman-sariCyclicDB",
    Key: {
      pk: id,
      sk: "s",
    },
  };

  const data = await ddbDocClient.send(new GetCommand(params));
  return res.status(200).json(data.Item);
});

app.post("/user", async (req, res) => {
  const params = {
    TableName: "drab-jade-caiman-sariCyclicDB",
    Item: {
      pk: "ghkdh" + new Date().getTime(),
      sk: "s",
      name: "Abu Zafor",
      gsi_prj: "springrain",
      prj: "something",
    },
  };

  await ddbDocClient.send(new PutCommand(params));
  return res.status(200).json({
    msg: "okay",
  });
});

// Create or Update an item
app.post("/:col/:key", async (req, res) => {
  console.log(req.body);

  const col = req.params.col;
  const key = req.params.key;
  console.log(
    `from collection: ${col} delete key: ${key} with params ${JSON.stringify(
      req.params
    )}`
  );
  const item = await db.collection(col).set(key, req.body);
  console.log(JSON.stringify(item, null, 2));
  res.json(item).end();
});

// Delete an item
app.delete("/:col/:key", async (req, res) => {
  const col = req.params.col;
  const key = req.params.key;
  console.log(
    `from collection: ${col} delete key: ${key} with params ${JSON.stringify(
      req.params
    )}`
  );
  const item = await db.collection(col).delete(key);
  console.log(JSON.stringify(item, null, 2));
  res.json(item).end();
});

// Get a single item
app.get("/:col/:key", async (req, res) => {
  const col = req.params.col;
  const key = req.params.key;
  console.log(
    `from collection: ${col} get key: ${key} with params ${JSON.stringify(
      req.params
    )}`
  );
  const item = await db.collection(col).get(key);
  console.log(JSON.stringify(item, null, 2));
  res.json(item).end();
});

// Get a full listing
app.get("/:col", async (req, res) => {
  const col = req.params.col;
  console.log(
    `list collection: ${col} with params: ${JSON.stringify(req.params)}`
  );
  const items = await db.collection(col).list();
  console.log(JSON.stringify(items, null, 2));
  res.json(items).end();
});

// Catch all handler for all other request.
app.use("*", (req, res) => {
  res.json({ msg: "no route handler found" }).end();
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`index.js listening on ${port}`);
});
