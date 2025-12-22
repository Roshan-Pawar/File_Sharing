import dotenv from "dotenv"
import mysql from "mysql2/promise"

dotenv.config();
// For local 
// const db = await mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "file_sharing_app"
// })

// for production
const db =  mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQLPORT,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 10
})

export default db
