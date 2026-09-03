import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import petsRoutes from './routes/pets';
import healthRoutes from './routes/health';
import remindersRoutes from './routes/reminders';
import clinicsRoutes from './routes/clinics';
import vetsRoutes from './routes/vets';
import appointmentsRoutes from './routes/appointments';
import emergencyRoutes from './routes/emergency';
import aiAssistantRoutes from './routes/aiAssistant';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Health Check
app.get('/api/health-check', (req, res) => {
  res.json({
    status: 'ok',
    service: 'pets.care backend api',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/reminders', remindersRoutes);
app.use('/api/clinics', clinicsRoutes);
app.use('/api/vets', vetsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/ai-assistant', aiAssistantRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 pets.care API server running on http://localhost:${PORT}`);
});

export default app;
