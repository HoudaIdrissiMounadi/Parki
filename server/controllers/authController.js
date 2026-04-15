import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'parkisecret123', {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Cet utilisateur existe déjà');
  }
  const user = await User.create({ name, email, password, phone, role });
  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id),
      },
      message: 'Compte créé avec succès',
    });
  } else {
    res.status(400);
    throw new Error('Données utilisateur invalides');
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id),
      },
      message: 'Connexion réussie',
    });
  } else {
    res.status(401);
    throw new Error('Email ou mot de passe incorrect');
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
};
