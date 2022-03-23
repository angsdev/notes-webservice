/*============================ Imports ============================*/
const { faker } = require('@faker-js/faker');
/*============================ Imports ============================*/
const { SeederBase } = require('../../../../').classes;
const { notes: { model }, users: { model: userModel }, noteTypes: { model: noteTypeModel } } = require('../../../../../modules').v1;
/*============================ Rest ============================*/

module.exports = class NotesSeeder extends SeederBase {

  /**
   * Create a new note seeder instance.
   * @param {number} quantity
   */
  constructor(quantity = 1){

    super(model, quantity);
  }

  /**
   * Execute the seeders.
   */
  async run(){

    this.seed(async () => ({
      user_id: await this.randomObjectId(userModel),
      type_id: await this.randomObjectId(noteTypeModel),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph()
    }));
  }
};