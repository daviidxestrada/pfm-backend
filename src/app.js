import cors from 'cors';
import express from 'express';

import errorHandler from './middlewares/errorMiddleware.js';
import apartmentRoutes from './routes/apartmentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import blockRoutes from './routes/blockRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/apartments', apartmentRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blocks', blockRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.use(errorHandler);

export default app;
