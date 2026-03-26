const Reservation = require('../models/Reservation');

// GET all reservations
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate("apartment");
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las reservas" });
    }
}

// GET reservation by ID
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate("apartment");

        if (!reservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la reserva" });        
    }
};

// CREATE reservation

const createReservation = async(req, res) => {
    try {
        const { apartment, startDate, endDate, totalPrice } = req.body;
        const reservation = new Reservation ({
            apartment,
            startDate,
            endDate,
            totalPrice
        });

        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reserva" });
    }
};

// DELETE reservation
const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        await reservation.deleteOne();
        res.json({ message: "Reserva eliminada" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reserva" });
    }
};

module.exports = {
    getReservations,
    getReservationById,
    createReservation,
    deleteReservation
}
