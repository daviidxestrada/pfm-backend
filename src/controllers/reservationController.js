const Reservation = require('../models/Reservation');
const Apartment = require('../models/Apartment');

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
        const { apartment, startDate, endDate, user } = req.body;

    if (!apartment || !startDate || !endDate) {
      const error = new Error('Todos los campos son obligatorios');
      error.statusCode = 400;
      throw error;
    }

    const apartmentDoc = await Apartment.findById(apartment);

    if (!apartmentDoc) {
      const error = new Error('Apartamento no encontrado');
      error.statusCode = 404;
      throw error;
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (Number.isNaN(parsedStartDate.getTime()) || Number.isNaN(parsedEndDate.getTime())) {
      const error = new Error('Las fechas no son válidas');
      error.statusCode = 400;
      throw error;
    }

    if (parsedStartDate >= parsedEndDate) {
      const error = new Error('La fecha de fin debe ser posterior a la de inicio');
      error.statusCode = 400;
      throw error;
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const totalNights = Math.ceil((parsedEndDate - parsedStartDate) / millisecondsPerDay);
    const totalPrice = totalNights * apartmentDoc.price;

    const reservation = new Reservation({
      user,
      apartment,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      totalPrice,
    });

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
