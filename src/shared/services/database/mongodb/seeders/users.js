/*============================ Imports ============================*/
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
/*============================ Imports ============================*/
const { SeederBase } = require('../../../../').classes;
const { model } = require('../../../../../modules').v1.users;
/*============================ Rest ============================*/

module.exports = class UsersSeeder extends SeederBase {

  /**
   * Create a new user seeder instance.
   * @param {number} quantity
   */
  constructor(quantity = 1){

    super(model, quantity);
  }

  /**
   * Execute the seeders.
   */
  async run(){

    this.seed(async (i) => ({
      firstname: (i === 0) ? 'admin' : faker.name.firstName(),
      lastname: (i === 0) ? 'admin' : faker.name.lastName(),
      username: (i === 0) ? 'admin' : faker.internet.userName(),
      phone: faker.phone.phoneNumber(),
      email: (i === 0) ? 'admin@localhost.com' : faker.internet.exampleEmail(),
      password: bcrypt.hashSync((i === 0) ? 'Admin.123' : faker.internet.password(), bcrypt.genSaltSync()),
    }));
  }
};