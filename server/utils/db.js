require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const { database } = keys;

const setupDB = async () => {
  try {
    // Verifica se já existe uma conexão ativa (1) ou em processo de conexão (2)
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      console.log(`${chalk.blue('✓')} ${chalk.blue('Reusing existing MongoDB connection')}`);
      return mongoose.connection;
    }

    // Configurações globais do Mongoose
    mongoose.set('useCreateIndex', true);

    // Connect to MongoDB
    await mongoose.connect(database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
    return mongoose.connection;
  } catch (error) {
    console.error(`${chalk.red('x')} ${chalk.red('MongoDB Connection Error:')}`, error);
    return null;
  }
};

module.exports = setupDB;
