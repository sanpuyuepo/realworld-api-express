const mongoose = require("mongoose");

const { dbUri } = require("../config/config.default");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUri);
  console.log("db connect success!");
}

module.exports = {
  User: mongoose.model("User", require("./user")),
  Article: mongoose.model("Article", require("./article")),
};
