const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const apartmentRoutes = require('./routes/apartmentRoutes');
app.use('/api/apartments', apartmentRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

module.exports = app;