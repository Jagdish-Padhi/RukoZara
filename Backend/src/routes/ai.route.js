import { Router } from 'express';
import { analyze, health, tts } from '../controllers/ai.controller.js';

const router = Router();

router.get('/health', health);
router.post('/analyze', analyze);
router.post('/tts', tts);

export default router;
