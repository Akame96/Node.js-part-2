// Do
// Using PgAdmin:
// Create a Postgres DB.
// Using a setupDb function:
// Create planets table.
// Populate the table with two planets (e.g. 'Earth' and 'Mars').
// Connect your app to Postgres using Express (pg-promise). [https://github.com/vitaly-t/pg-promise]
// Replace the dummy DB with the Postgres DB.
// Rewrite all planets controller functions. They should now work with the DB. (Use the SQL queries below.)
// Use
// SQL query to create the table:

// DROP TABLE IF EXISTS planets;

// CREATE TABLE planets(
//   id SERIAL NOT NULL PRIMARY KEY,
//   name TEXT NOT NULL,
// );
// Make sure that all CRUD operations read from and write to Postgres (instead of the dummy db you've been using in previous exercises).

// GET /planets
// Use this SQL query:
// SELECT * FROM planets;
// GET /planets/:id
// Use this SQL query:
// SELECT * FROM planets WHERE id=$1;
// Make sure that $1 is id.
// POST /planets
// Use this SQL query:
// INSERT INTO planets (name) VALUES ($1);
// Make sure that $1 is name.
// PUT /planets/:id
// Use this SQL query:
// UPDATE planets SET name=$2 WHERE id=$1;
// Make sure that $1 is id and $2 is name.
// DELETE /planets/:id
// Use this SQL query:
// DELETE FROM planets WHERE id=$1;
// Make sure that $1 is id.
import { Response, Request } from "express";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/");

const setupDb = async () => {
  await db.none(`
DROP TABLE IF EXISTS planets;

CREATE TABLE planets(
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
)
`);
  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
};
setupDb();

// GET 
export const getAllPlanets = async (req: Request, res: Response) => {
  try {
    const planets = await db.any(`SELECT * FROM planets`);
    res.json(planets);
  } catch (error) {
    res.status(500).json("errore");
  }
};

// GET by ID
export const getPlanetById = async (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);

  try {
    const planet = await db.one(
      `SELECT * FROM planets WHERE id = $1`,
      Number(planetId)
    );
    res.json(planet);
  } catch (error) {
    res.status(500).json("errore");
  }
};

// POST
export const createPlanet = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, String(name));
    res.status(201).json({ message: "Planet created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Planet not created" });
  }
};

// PUT
export const updatePlanet = async (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);
  const { name } = req.body;

  try {
    await db.none(`UPDATE planets SET name = $2 WHERE id = $1`, [
      planetId,
      name,
    ]);
    res.json({ message: "Planet updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Planet not updated" });
  }
};

// DELETE
export const deletePlanet = async (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);

  try {
    await db.none(`DELETE FROM planets WHERE id = $1`, Number(planetId));
    res.json({ message: "Planet deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Planet not deleted" });
  }
};
