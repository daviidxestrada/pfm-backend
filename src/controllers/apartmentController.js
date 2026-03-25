const Apartment = require('../models/Apartment');

// @desc Obtener todos los apartamentos
// @route GET /api/apartments

const getApartments = async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch(error) {
        res.status(500).json({message: "Error al obtener los apartamentos"});
    }
};

module.exports = {
    getApartments,
};