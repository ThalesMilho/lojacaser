const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const setupDB = require('./db');
const { ROLES } = require('../constants');
const User = require('../models/user');
const Brand = require('../models/brand');
const Product = require('../models/product');
const Category = require('../models/category');

const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

const NUM_PRODUCTS = 20; // Reduzido para o MVP inicial
const DEFAULT_BRAND_NAME = 'Loja de Moda Feminina';
const FASHION_CATEGORIES = [
  'Vestidos',
  'Blusas',
  'Calças',
  'Saias',
  'Conjuntos',
  'Acessórios'
];

const seedDB = async () => {
  try {
    console.log(`${chalk.blue('✓')} ${chalk.blue('Seed database started')}`);

    // 1. Seed Admin User
    if (!email || !password) throw new Error('Missing arguments for admin user (email password)');
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Seeding admin user...')}`);
      const user = new User({
        email,
        password,
        firstName: 'Admin',
        lastName: 'User',
        role: ROLES.Admin
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      await user.save();
      console.log(`${chalk.green('✓')} ${chalk.green('Admin user seeded.')}`);
    } else {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Admin user already exists.')}`);
    }

    // 2. Seed Default Brand
    let defaultBrand = await Brand.findOne({ name: DEFAULT_BRAND_NAME });
    if (!defaultBrand) {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Seeding default brand...')}`);
      defaultBrand = new Brand({
        name: DEFAULT_BRAND_NAME,
        description: 'Nossa loja oficial de moda feminina.',
        isActive: true
      });
      await defaultBrand.save();
      console.log(`${chalk.green('✓')} ${chalk.green('Default brand seeded.')}`);
    } else {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Default brand already exists.')}`);
    }

    // 3. Seed Fashion Categories
    let categories = [];
    for (const catName of FASHION_CATEGORIES) {
      let category = await Category.findOne({ name: catName });
      if (!category) {
        console.log(`${chalk.yellow('!')} ${chalk.yellow(`Seeding category: ${catName}...`)}`);
        category = new Category({
          name: catName,
          description: `Coleção de ${catName.toLowerCase()} para o dia a dia.`,
          isActive: true
        });
        await category.save();
        console.log(`${chalk.green('✓')} ${chalk.green(`Category ${catName} seeded.`)}`);
      } else {
        console.log(`${chalk.yellow('!')} ${chalk.yellow(`Category ${catName} already exists.`)}`);
      }
      categories.push(category);
    }

    // 4. Seed Initial Products (Optional, linked to default brand and categories)
    const productsCount = await Product.countDocuments();
    if (productsCount < NUM_PRODUCTS) {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Seeding initial products...')}`);
      for (let i = 0; i < NUM_PRODUCTS; i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const product = new Product({
          sku: faker.string.alphanumeric(10).toUpperCase(),
          name: `${faker.commerce.productAdjective()} ${randomCategory.name.slice(0, -1)}`,
          description: faker.commerce.productDescription(),
          quantity: faker.number.int({ min: 10, max: 50 }),
          price: faker.commerce.price({ min: 49, max: 299 }),
          taxable: true,
          isActive: true,
          brand: defaultBrand._id,
          category: randomCategory._id
        });
        await product.save();
        
        // Associate product with category
        await Category.updateOne(
          { _id: randomCategory._id },
          { $addToSet: { products: product._id } }
        );
      }
      console.log(`${chalk.green('✓')} ${chalk.green('Initial products seeded.')}`);
    } else {
      console.log(`${chalk.yellow('!')} ${chalk.yellow('Products already exist, skipping product seeding.')}`);
    }

  } catch (error) {
    console.log(`${chalk.red('x')} ${chalk.red('Error while seeding database')}`);
    console.log(error);
  } finally {
    await mongoose.connection.close();
    console.log(`${chalk.blue('✓')} ${chalk.blue('Database connection closed!')}`);
  }
};

(async () => {
  try {
    await setupDB();
    await seedDB();
  } catch (error) {
    console.error(`Error initializing database: ${error.message}`);
  }
})();
