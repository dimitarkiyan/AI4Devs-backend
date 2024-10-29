import { Router } from 'express';
import { updateCandidateInterviewStep } from '../presentation/controllers/candidateController';

const router = Router();

// New route for updating candidate interview step
router.put('/:id', updateCandidateInterviewStep);

export default router;
