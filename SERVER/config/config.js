import dotenv from "dotenv";
import devKeys from "./dev";
import testKeys from "./test";
import prodKeys from "./prod";

dotenv.config();

if (process.env.NODE_ENV === "production") {
  module.exports = prodKeys;
} else if (process.env.NODE_ENV === "test") {
  module.exports = testKeys;
} else {
  module.exports = devKeys;
}

