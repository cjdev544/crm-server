const validator = require('validator');
const Client = require('../models/Client');

const createClientController = async (input, context) => {
  try {
    // Formatted client email and validated
    const formattedEmail = input.email.toLowerCase();
    if (!validator.isEmail(formattedEmail)) {
      return {
        ok: false,
        err: 'Formato de correo incorrecto',
      };
    }
    // Validated if clieent exist
    const client = await Client.findOne({ email: input.email });
    if (client) {
      return {
        ok: false,
        err: 'Este cliente ya existe en nuestra base de datos',
      };
    }
    // Insert sellerId and change formatted email before saving
    const newClient = new Client(input);
    newClient.email = formattedEmail;
    newClient.sellerId = context.id;
    // Save client on Database
    await newClient.save();
    return {
      ok: true,
      client: newClient,
    };
  } catch (err) {
    console.log(err);
  }
};

const getAllClientsController = async () => {
  try {
    const clients = await Client.find({});
    return clients;
  } catch (err) {
    console.log(err);
  }
};

const getClientsBySellerController = async (context) => {
  try {
    const clients = await Client.find({ sellerId: context.id });
    return clients;
  } catch (err) {
    console.log(err);
  }
};

const getClientController = async (id, context) => {
  try {
    // Validates if clien exist
    const client = await Client.findById(id);
    if (!client) {
      return {
        ok: false,
        err: 'Cliente no encontrado',
      };
    }
    // Validate client is the user
    if (client.sellerId.toString() !== context.id) {
      return {
        ok: false,
        err: 'Usuario no autorizado',
      };
    }
    return {
      ok: true,
      client,
    };
  } catch (err) {
    console.log(err);
  }
};

const updateClientController = async (id, input, context) => {
  try {
    // Validates if clien exist
    const client = await Client.findById(id);
    if (!client) {
      return {
        ok: false,
        err: 'Cliente no encontrado',
      };
    }
    // Validate client is the user
    if (client.sellerId.toString() !== context.id) {
      return {
        ok: false,
        err: 'Usuario no autorizado',
      };
    }
    // Formatted client email and validated
    const formattedEmail = input.email.toLowerCase();
    if (!validator.isEmail(formattedEmail)) {
      return {
        ok: false,
        err: 'Formato de correo incorrecto',
      };
    }
    const formattedClient = input;
    formattedClient.email = formattedEmail;
    // Update client and save
    const updateClient = await Client.findByIdAndUpdate(id, formattedClient, {
      new: true,
    });
    return {
      ok: true,
      client: updateClient,
    };
  } catch (err) {
    console.log(err);
  }
};

const deleteClientController = async (id, context) => {
  try {
    // Validates if clien exist
    const client = await Client.findById(id);
    if (!client) {
      return {
        ok: false,
        err: 'Cliente no encontrado',
      };
    }
    // Validate client is the user
    if (client.sellerId.toString() !== context.id) {
      return {
        ok: false,
        err: 'Usuario no autorizado',
      };
    }
    // Client delete
    const res = await Client.findByIdAndRemove(id);
    return {
      ok: true,
      res,
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createClientController,
  getAllClientsController,
  getClientsBySellerController,
  getClientController,
  updateClientController,
  deleteClientController,
};
