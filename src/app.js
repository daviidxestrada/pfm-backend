import cors from 'cors';
import express from 'express';

import errorHandler from './middlewares/errorMiddleware.js';
import apartmentRoutes from './routes/apartmentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/apartments', apartmentRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.use(errorHandler);

export default app;
