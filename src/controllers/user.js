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
  if (!validator.isEmail(formattedEmail)) {
    return {
      ok: false,
      err: 'Formato de correo incorrecto',
    };
  }

  try {
    const user = await User.findOne({ email: formattedEmail });
    // Validate if user exist
    if (user) {
      return {
        ok: false,
        err: 'El correo ya se encuentra registrado',
      };
    }
    // Formatted email change before saving
    const newUser = new User(input);
    newUser.email = formattedEmail;
    // Password encrypt
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return {
          ok: false,
          err: 'Error al crear usuario. Intentalo de nuevo',
        };
      }
      newUser.password = hash;
      // Save user on Database
      newUser.save();
    });
    return {
      ok: true,
      user: newUser,
    };
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
    if (!validator.isEmail(formattedEmail)) {
      return {
        ok: false,
        err: 'Formato de correo incorrecto',
      };
    }
    // Validate if user exist
    const user = await User.findOne({ email: formattedEmail });
    if (!user) {
      return {
        ok: false,
        err:
          'El correo no se encuentra registrado! Registrate para poder ingresar',
      };
    }
    // Compare passwords
    if (!(await bcrypt.compare(password, user.password))) {
      return {
        ok: false,
        err: 'La combinacion de correo y contraseña no es correcta',
      };
    }
    const token = await jwtGenerator(user);
    return {
      ok: true,
      token,
    };
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

module.exports = {
  createUserController,
  loginUserController,
  getAllUsersController,
};
