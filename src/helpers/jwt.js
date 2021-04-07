const jwt = require('jsonwebtoken');

const jwtGenerator = (user) => {
  return new Promise((resolve, reject) => {
    const { name, lastName, id } = user;

    const payload = {
      name,
      lastName,
      id,
    };

    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(new Error('Error al autenticar, intentelo de nuevo'));
        }
        resolve(token);
      }
    );
  });
};

module.exports = jwtGenerator;
