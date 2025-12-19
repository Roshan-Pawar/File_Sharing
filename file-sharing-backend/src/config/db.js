import mysql from "mysql2/promise"

// For local 
// const db = await mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "file_sharing_app"
// })

// for production
const db =  mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
   multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10
})

export default db
