import dotenv from "dotenv";
import mysql from "mysql2";

// Load environment variables
dotenv.config();

// Create MySQL pool connection
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Test the database connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((error) => {
    console.error("Database connection failed: " + error.message);
  });

// Close the pool on server termination
process.on("SIGINT", () => {
  pool.end((error) => {
    if (error) {
      console.error("Error closing pool: " + error.message);
    } else {
      console.log("Database pool closed");
    }
    process.exit(0);
  });
});

export default pool;
