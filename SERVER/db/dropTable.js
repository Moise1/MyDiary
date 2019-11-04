import pool from "./dbEnv";

pool.on("connect", () => {
    console.log('Tables dropped!')
  });

const removeTables = "DROP TABLE IF EXISTS users, entries CASCADE;";
pool.query(removeTables);

module.exports =  pool;
