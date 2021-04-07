const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtGenerator = require('../helpers/jwt');

const createUserController = async (input) => {
  const { email, password } = input;
  // Formatted email
  const formattedEmail = email.toLowerCase();
  // Validate email
  if (!validator.isEmail(formattedEmail))
    throw new Error('Formato de correo incorrecto');

  try {
    const user = await User.findOne({ email: formattedEmail });
    // Validate if user exist
    if (user) throw new Error('El Correo ya se encuentra registrado');
    // Formatted email change before saving
    const newUser = new User(input);
    newUser.email = formattedEmail;
    // Password encrypt
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw new Error('Error al crear usuario. Intentalo de nuevo');
      newUser.password = hash;
      // Save user on Database
      newUser.save();
    });
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

const loginUserController = async (input) => {
  const { email, password } = input;
  // Formatted email
  const formattedEmail = email.toLowerCase();
  try {
    // Validated email
    if (!validator.isEmail(formattedEmail))
      throw new Error('Formato de correo incorrecto');
    // Validate if user exist
    const user = await User.findOne({ email: formattedEmail });
    if (!user)
      throw new Error(
        'El correo no se encuentra registrado! Registrate para poder ingresar'
      );
    // Compare passwords
    bcrypt.compare(password, user.password, (err, res) => {
      if (err)
        throw new Error('El combinación de correo y contraseña no es correcta');
    });
    // Token generate
    const token = await jwtGenerator(user);
    return { token };
  } catch (err) {
    console.log(err);
  }
};

const getAllUsersController = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    console.log(err);
  }
};

const getUserController = async (token) => {
  try {
    const user = await jwt.verify(token, process.env.PRIVATE_KEY);
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserController,
};
