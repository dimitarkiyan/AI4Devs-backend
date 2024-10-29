import { Router } from 'express';
import { getCandidatesByPositionController } from '../presentation/controllers/candidateController';

const router = Router();

// Route for getting candidates by position ID
router.get('/position/:id/candidates', getCandidatesByPositionController);

export default router;
