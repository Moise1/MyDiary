import pool from "./dbEnv";

pool.on("connect", () => {
    console.log('DB Connected...');
});


try{

    const  tables = `
            CREATE TABLE IF NOT EXISTS users(
             user_id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY, 
             first_name  VARCHAR(50) NOT NULL, 
             last_name  VARCHAR(50) NOT NULL, 
             email VARCHAR(250) NOT NULL, 
             password VARCHAR(250) NOT NULL);
             
             CREATE TABLE IF NOT EXISTS entries(
                entry_id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY, 
                title  VARCHAR(50) NOT NULL, 
                description TEXT  NOT NULL,
                created_on DATE NOT NULL);`;

pool.query(tables);


}catch(err){
    console.log(err.message);
}
module.exports = pool;
