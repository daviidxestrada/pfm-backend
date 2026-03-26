const Apartment = require("../models/Apartment");

// GET all apartments

const getApartments = async(req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los apartamentos" });
    }
};

// GET apartment by ID
const getApartmentById = async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);

        if (!apartment) {
            return res.status(404).json({ message: "Apartamento no encontrado" });
        }

        res.json(apartment);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el apartamento" });
    }
    }
    
// CREATE apartment
    const createApartment = async (req, res) => {
        try {
            const { title, description, city, price, images } = req.body;  
            const apartment = new Apartment ({
                title,
                description,
                city,
                price,
                images
            })

            const savedApartment = await apartment.save();
            res.status(201).json(savedApartment);
        } catch (error) {
            res.status(500).json({ message: "Error al crear el apartamento" });
        }
    };

// UPDATE apartment

const updateApartment = async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);

        if (!apartment) {
            return res.status(404).json({ message: "Apartamento no encontrado" });
        }

        const { title, description, city, price, images } = req.body;

        apartment.title = title || apartment.title;
        apartment.description = description || apartment.description;
        apartment.city = city || apartment.city;
        apartment.price = price || apartment.price;
        apartment.images = images || apartment.images;

        const updatedApartment = await apartment.save();
        res.json(updatedApartment);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el apartamento" });
    }
};

// DELETE apartment

const deleteApartment = async (req,res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);

        if (!apartment) {
            return res.status(404).json({ message: "Apartamento no encontrado" });
        }   

        await apartment.deleteOne();
        res.json({ message: "Apartamento eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el apartamento" });
    }
};

module.exports = {
    getApartments,
    getApartmentById,
    createApartment,
    updateApartment,
    deleteApartment
}
