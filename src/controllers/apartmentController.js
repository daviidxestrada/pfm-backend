import Apartment from '../models/Apartment.js';

export const getApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (error) {
    next(error);
  }
};

export const getApartmentById = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      const error = new Error('Apartamento no encontrado');
      error.statusCode = 404;
      throw error;
    }

    res.json(apartment);
  } catch (error) {
    next(error);
  }
};

export const createApartment = async (req, res, next) => {
  try {
    const { title, description, city, price } = req.body;

    if (!title || !description || !city || !price) {
      const error = new Error('Todos los campos son obligatorios');
      error.statusCode = 400;
      throw error;
    }

    if (price <= 0) {
      const error = new Error('El precio debe ser mayor que 0');
      error.statusCode = 400;
      throw error;
    }

    const apartment = new Apartment(req.body);
    const savedApartment = await apartment.save();

    res.status(201).json(savedApartment);
  } catch (error) {
    next(error);
  }
};

export const updateApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      const error = new Error('Apartamento no encontrado');
      error.statusCode = 404;
      throw error;
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
    next(error);
  }
};

export const deleteApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);

    if (!apartment) {
      const error = new Error('Apartamento no encontrado');
      error.statusCode = 404;
      throw error;
    }

    await apartment.deleteOne();
    res.json({ message: 'Apartamento eliminado' });
  } catch (error) {
    next(error);
  }
};
