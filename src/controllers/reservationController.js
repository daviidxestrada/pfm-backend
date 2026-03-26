const Reservation = require('../models/Reservation');

// GET all reservations
const getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find().populate("apartment");
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};

// GET reservation by ID
const getReservationById = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate("apartment");

        if (!reservation) {
            const error = new Error("Reserva no encontrada");
            error.statusCode = 404;
            throw error;
        }

        res.json(reservation);
    } catch (error) {
        next(error);
    }
};

// CREATE reservation

const createReservation = async(req, res, next) => {
    try {
        const { apartment, startDate, endDate, totalPrice } = req.body;

    if (!apartment || !startDate || !endDate || !totalPrice) {
      const error = new Error('Todos los campos son obligatorios');
      error.statusCode = 400;
      throw error;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      const error = new Error('La fecha de fin debe ser posterior a la de inicio');
      error.statusCode = 400;
      throw error;
    }

    const reservation = new Reservation(req.body);

        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        next(error);
    }
};

// DELETE reservation
const deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            const error = new Error("Reserva no encontrada");
            error.statusCode = 404;
            throw error;
        }

        await reservation.deleteOne();
        res.json({ message: "Reserva eliminada" });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getReservations,
    getReservationById,
    createReservation,
    deleteReservation
}
