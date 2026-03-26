const express = require('express');
const cors = require('cors');
const apartmentRoutes = require('./routes/apartmentRoutes');
const reservationRoutes = require('./routes/reservationRoutes');


const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/apartments', apartmentRoutes);
app.use('/api/reservations', reservationRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

module.exports = app;