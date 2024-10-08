// Do
// Add planets Controller (controllers/planets.ts) consisting of the following functions:
// getAll
// getOneById
// create
// updateById
// deleteById.
// Then, replace callback functions in routes (req: Request, res: Response) => with the functions above. (For example: the route /api/planets should use getAll function.)
// Use
// The dummy database of planets from the previous exercise.
// Array.prototype.find higher-order function to Get One.
// Spread operator ([...planets]) to Create.
// Array.prototype.map higher-order function to Update.
// Array.prototype.filter higher-order function to Delete.

import { Request, Response } from "express";
import Joi from "joi";

// Dummy database
interface Planet {
  id: number;
  name: string;
}

let planets: Planet[] = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

// utilizzo Joi
const planetSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

// Controllers
export const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }
  res.status(200).json(planet);
};

export const create = (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const newPlanet: Planet = {
    id: planets.length + 1,
    name: req.body.name,
  };

  //usando lo spread operator per aggiungere altri pianeti
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "Planet created successfully" });
};

export const updateById = (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const planetId = parseInt(req.params.id);
  const planetExists = planets.some((p) => p.id === planetId);

  if (!planetExists) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  planets = planets.map((p) =>
    p.id === planetId ? { ...p, name: req.body.name } : p
  ); // Using map to update
  res.status(200).json({ msg: "Planet updated successfully" });
};

export const deleteById = (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);
  const planetExists = planets.some((p) => p.id === planetId);

  if (!planetExists) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  planets = planets.filter((p) => p.id !== planetId);
  res.status(200).json({ msg: "Planet deleted successfully" });
};
