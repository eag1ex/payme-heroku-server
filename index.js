// INIT environment
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

module.exports = require("./server");
