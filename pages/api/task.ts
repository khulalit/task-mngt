import { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "../../lib/db";
import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("").max(500),
  priority: Joi.number().integer().min(1).max(3).required(),
  status: Joi.string().required(),
});

const statusSchema = Joi.object({
  status: Joi.string().required(),
  id: Joi.number().required(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await openDb();

  switch (req.method) {
    case "GET":
      const { search = "" } = req.query;

      let query = `
        SELECT * FROM tasks
        WHERE title LIKE ? OR description LIKE ?
        ORDER BY priority ASC, updatedAt DESC`;
      let searchParam = `%${search}%`;

      const tasks = await db.all(query, [searchParam, searchParam]);
      const totalTasksQuery = `
        SELECT COUNT(*) AS count FROM tasks
        WHERE title LIKE ? OR description LIKE ?`;
      const totalTasks = await db.get(totalTasksQuery, [
        searchParam,
        searchParam,
      ]);

      res.json({
        tasks,
        total: totalTasks.count,
      });
      break;

    case "POST":
      const { error: postError } = taskSchema.validate(req.body);
      if (postError) {
        return res.status(400).json({ message: postError.details[0].message });
      }

      try {
        const { title, description, priority, status } = req.body;
        await db.run(
          "INSERT INTO tasks (title, description, priority, status, createdAt, updatedAt) VALUES (?, ?, ?, ?,DATETIME('now'), DATETIME('now'))",
          [title, description, priority, status]
        );
        res.status(201).json({ message: "Task added" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    case "PUT": {
      const { id, title, description, priority, status } = req.body;
      const { error: putError } = taskSchema.validate({
        title,
        description,
        priority,
        status,
      });
      if (putError) {
        return res.status(400).json({ message: putError.details[0].message });
      }

      try {
        const result = await db.run(
          "UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, updatedAt = DATETIME('now') WHERE id = ?",
          [title, description, priority, status, id]
        );

        if (result.changes === 0) {
          return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated" });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    }

    case "PATCH": {
      const { error: patchError } = statusSchema.validate(req.body);
      if (patchError) {
        return res.status(400).json({ message: patchError.details[0].message });
      }

      const { id, status } = req.body;

      try {
        const result = await db.run(
          "UPDATE tasks SET status = ?, updatedAt = DATETIME('now') WHERE id = ?",
          [status, id]
        );

        if (result.changes === 0) {
          return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task status updated" });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    }
    case "DELETE":
      const { id: deleteId } = req.body;
      const result = await db.run("DELETE FROM tasks WHERE id = ?", [deleteId]);
      if (result.changes === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json({ message: "Task deleted" });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await db.close();
};

export default handler;
