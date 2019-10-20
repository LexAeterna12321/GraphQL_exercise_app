const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
require("dotenv").config();

const { DB_USER, DB_PASS } = process.env;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-3vzik.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(err => console.log(`----Error in Db connection: ${err.message}----`));

mongoose.connection.once("open", () =>
  console.log("----Connected to Database----")
);

const app = express();

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`----Listening on PORT: ${PORT}----`));
