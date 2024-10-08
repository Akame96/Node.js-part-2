import express from 'express';
import { getAll, getOneById, create, updateById, deleteById } from './esercizio3';

const router = express.Router();

// GET /api/planets
router.get('/planets', getAll);

// GET /api/planets/:id
router.get('/planets/:id', getOneById);

// POST /api/planets
router.post('/planets', create);

// PUT /api/planets/:id
router.put('/planets/:id', updateById);

// DELETE /api/planets/:id
router.delete('/planets/:id', deleteById);

export default router;
