import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/ai.route.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api', aiRoutes);

export default app;
