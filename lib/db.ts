import { open } from "sqlite";
import sqlite3 from "sqlite3";

const DATABASE_FILE = "./database.db";

export const openDb = async () => {
  return open({
    filename: DATABASE_FILE,
    driver: sqlite3.Database,
  });
};

export const initDb = async () => {
  const db = await openDb();

  // Create the tasks table if it doesn't exist
  await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        priority INTEGER NOT NULL,
        status TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

  await db.close();
};

// initDb();
