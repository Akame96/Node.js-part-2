import express, { Request, Response } from 'express';
import Joi from 'joi';

const router = express.Router();


interface Planet {
  id: number;
  name: string;
}

// Dummy database
let planets: Planet[] = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

// utilizzo joi
const planetSchema = Joi.object({
  name: Joi.string().min(3).required()
});

// GET /api/planets
router.get('/planets', (req: Request, res: Response) => {
  res.status(200).json(planets);
});

// GET /api/planets/:id: ritornare un pianeta dall'id
router.get('/planets/:id', (req: Request, res: Response) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));

  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  res.status(200).json(planet);
});

// POST /api/planets: creare un pianeta
router.post('/planets', (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const newPlanet: Planet = {
    id: planets.length + 1, // Auto-increment id
    name: req.body.name
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
});

// PUT /api/planets/:id: caricare un pianeta dall'id
router.put('/planets/:id', (req: Request, res: Response) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));

  if (!planet) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  // caricare un pianeta dal nome
  planet.name = req.body.name;
  res.status(200).json({ msg: "Planet updated successfully" });
});

// DELETE /api/planets/:id: cancellare un pianeta dall'id
router.delete('/planets/:id', (req: Request, res: Response) => {
  const planetIndex = planets.findIndex(p => p.id === parseInt(req.params.id));

  if (planetIndex === -1) {
    return res.status(404).json({ msg: "Planet not found" });
  }

  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: "Planet deleted successfully" });
});

export default router;


