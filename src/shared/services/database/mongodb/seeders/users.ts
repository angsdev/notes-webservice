/*============================ Imports ============================*/
import * as bcrypt from 'bcryptjs';
import { SeederBase } from '../../../../';
import { faker } from '@faker-js/faker';
import { v1 } from '../../../../../modules';
/*============================ Vars setup ============================*/
const { model } = v1.users.persistence.mongodb;
/*============================ Rest ============================*/

export default class UsersSeeder extends SeederBase {

  /**
   * Create a new user seeder instance.
   * @param {number} quantity
   */
  constructor(quantity: number = 1){

    super(model, quantity);
  }

  /**
   * Execute the seeders.
   */
  async run(){

    this.seed(async (i: number) => ({
      firstname: (i === 0) ? 'admin' : faker.name.firstName(),
      lastname: (i === 0) ? 'admin' : faker.name.lastName(),
      username: (i === 0) ? 'admin' : faker.internet.userName(),
      phone: faker.phone.phoneNumber(),
      email: (i === 0) ? 'admin@localhost.com' : faker.internet.exampleEmail(),
      password: bcrypt.hashSync((i === 0) ? 'Admin.123' : faker.internet.password(), bcrypt.genSaltSync())
    }));
  }
}