import { Pool } from "pg";

//Bring in Keys for DB from configuration folder
import devKeys from "../config/config";
import prodKeys from "../config/config";
import testKeys from "../config/config";




// Connect to the database Depending on the environment

if (process.env.NODE_ENV === "production") {
  module.exports = new Pool({
    connectionString: prodKeys.DATABASE_URL,
  });
}

if (process.env.NODE_ENV === "test") {
  module.exports = new Pool({
    connectionString: testKeys.DATABASE_URL,
  });

} else {
  module.exports = new Pool({
    connectionString: devKeys.DATABASE_URL,
  });
}