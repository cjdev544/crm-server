const mongoose = require('mongoose');

const dbConection = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Database is connect');
      console.log('#############################################');
    })
    .catch((err) => console.error(err));
};

module.exports = dbConection;
