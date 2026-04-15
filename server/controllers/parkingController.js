import Parking from '../models/Parking.js';

export const getParkings = async (req, res) => {
  const { city, type, minPrice, maxPrice, sort } = req.query;
  let query = {};
  if (city) query.city = city;
  if (type) query.type = type;
  if (minPrice || maxPrice) {
    query.pricePerHour = {};
    if (minPrice) query.pricePerHour.$gte = Number(minPrice);
    if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);
  }
  let result = Parking.find(query);
  if (sort) {
    const sortBy = sort.split(',').join(' ');
    result = result.sort(sortBy);
  } else {
    result = result.sort('-createdAt');
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const parkings = await result;
  const total = await Parking.countDocuments(query);
  res.json({
    success: true,
    data: parkings,
    pagination: { total, page, pages: Math.ceil(total / limit) },
  });
};

export const getNearbyParkings = async (req, res) => {
  const { lat, lng, dist = 5000 } = req.query;
  if (!lat || !lng) {
    res.status(400);
    throw new Error('Veuillez fournir la latitude et la longitude');
  }
  const parkings = await Parking.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
        $maxDistance: Number(dist),
      },
    },
  });
  res.json({ success: true, data: parkings });
};

export const getParkingById = async (req, res) => {
  const parking = await Parking.findById(req.params.id).populate('owner', 'name avatar');
  if (parking) {
    res.json({ success: true, data: parking });
  } else {
    res.status(404);
    throw new Error('Parking non trouvé');
  }
};

export const createParking = async (req, res) => {
  const parking = await Parking.create({ ...req.body, owner: req.user._id });
  res.status(201).json({ success: true, data: parking, message: 'Parking ajouté avec succès' });
};
