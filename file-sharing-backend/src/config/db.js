import mysql from "mysql2/promise"

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "file_sharing_app"
})

export default db
