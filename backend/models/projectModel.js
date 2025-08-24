import { query } from "../db/index.js";

export async function createProject(
  userId,
  { owner, name, url, stars, forks, issues, created_at }
) {
  const result = await query(
    `INSERT INTO projects
      (user_id, owner, name, url, stars, forks, issues, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
    [userId, owner, name, url, stars, forks, issues, created_at]
  );
  return result.rows[0];
}

export async function getProjectsByUser(userId) {
  const result = await query(`SELECT * FROM projects WHERE user_id=$1`, [
    userId,
  ]);
  return result.rows;
}

export async function deleteProjectByUser(userId, projectId) {
  const result = await query(
    `DELETE FROM projects
     WHERE user_id=$1 AND id=$2
     RETURNING *`,
    [userId, projectId]
  );
  return result.rows[0];
}

export async function updateProjectStats(projectId, { stars, forks, issues }) {
  const result = await query(
    `UPDATE projects
     SET stars=$1, forks=$2, issues=$3
     WHERE id=$4
     RETURNING *`,
    [stars, forks, issues, projectId]
  );
  return result.rows[0];
}
