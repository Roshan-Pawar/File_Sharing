import db from "./db.js";

const initSchema = async () => {
  try {
    console.log("Initializing database");

    await db.query(`
      CREATE DATABASE IF NOT EXISTS file_sharing_app;
    `);

    console.log("Database created");

    await db.query(`
      USE file_sharing_app;
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        original_name VARCHAR(255),
        file_name VARCHAR(255),
        mime_type VARCHAR(100),
        size INT,
        path VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
          ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS file_shares (
        id INT AUTO_INCREMENT PRIMARY KEY,
        file_id INT,
        shared_with INT,
        FOREIGN KEY (file_id) REFERENCES files(id)
          ON DELETE CASCADE,
        FOREIGN KEY (shared_with) REFERENCES users(id)
          ON DELETE CASCADE
      );
    `);

    console.log("Schema created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Schema init failed:", error);
    process.exit(1);
  }
};

initSchema();
